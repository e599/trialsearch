from kg_builder.conf.config import get_sys_config
import time
import subprocess
import os

m_host = ""
m_file_root = ""


# run all load steps
def load():
    global m_host
    global m_file_root

    start_time = time.time()    

    # Determine working env.  Current values - STAGE or LOCAL
    kg_env = os.environ.get('KG_ENV')
    m_host = get_sys_config('host', kg_env)
    m_file_root = get_sys_config('csv_files_location_graphdb', kg_env)
    
    print("Stopping Neo4j...")
    success = stop_neo4j()
    if not success: print("stop_neo4j failed. Exiting load."); return
    print("Neo4j stopped.")

    print("Deleting database...")
    success = delete_database()
    if not success: print("delete_database failed. Exiting load."); return
    print("Database deleted.")

    print("Loading all CSV files...")
    success = load_all_csvs()
    if not success: print("load_all_csvs failed. Exiting load."); return
    print("All CSV files loaded.")
    
    print("Starting Neo4j...")
    success = start_neo4j()
    if not success: print("start_neo4j failed. Exiting load."); return
    print("Neo4j started.") 
    
    end_time = time.time()
    print("Load graph completed in " + str(round(end_time - start_time)) + " seconds.")


# load csvs to neo4j
def load_all_csvs():    
    command = """
        sudo runuser neo4j -c "\
            neo4j-admin import \
            --mode=csv \
            --database=graph.db \
            --report-file=/var/log/neo4j/import.report \
            --ignore-missing-nodes=true \
            --ignore-duplicate-nodes=true \
            --id-type=string \
            --nodes:Agency {file_root}/node_agency.csv \
            --nodes:AgencyClass {file_root}/node_agency_class.csv \
            --nodes:AgeRange {file_root}/node_age_range.csv \
            --nodes:ClinicalTrial {file_root}/node_clinical_trial.csv \
            --nodes:Condition {file_root}/node_condition.csv \
            --nodes:Contact {file_root}/node_contact.csv \
            --nodes:EnrollmentStatus {file_root}/node_enrollment_status.csv \
            --nodes:HealthyVolunteers {file_root}/node_healthy_volunteers.csv \
            --nodes:Intervention {file_root}/node_intervention.csv \
            --nodes:InterventionType {file_root}/node_intervention_type.csv \
            --nodes:Location {file_root}/node_location.csv \
            --nodes:MeshTerm {file_root}/node_mesh_term.csv \
            --nodes:MeshTermType {file_root}/node_mesh_term_type.csv \
            --nodes:Phase {file_root}/node_phase.csv \
            --nodes:Sex {file_root}/node_sex.csv \
            --nodes:Year {file_root}/node_year.csv \
            --relationships {file_root}/relationship_all.csv \
        "
    """.format(file_root=m_file_root)
    success = execute_remote_wait(command, True)
    return success


# delete the neo4j database
def delete_database():    
    command = """
                sudo rm -rf /var/lib/neo4j/data/databases/graph.db                
            """    
    success = execute_remote_wait(command, True)    
    return success


# start the neo4j service
def start_neo4j():
    command = """
                sudo service neo4j start
            """    
    success = execute_remote_wait(command, True)  
    if not success : return false
    
    success = block_until_neo4j_available()
    return success


# stop the neo4j service
def stop_neo4j():
    command = """
                sudo service neo4j stop
            """    
    success = execute_remote_wait(command, True)        
    return success


# wait for neo4j to start
def block_until_neo4j_available():
    command = """
                end="$((SECONDS+60))"
                while true; do
                    nc -w 2 localhost 7687 && break
                    [[ "${SECONDS}" -ge "${end}" ]] && exit 1
                    sleep 1
                done
              """
    success = execute_remote_wait(command, False)
    return success


# execute a command to the server over ssh and wait
def execute_remote_wait(command, show_output):
    ssh_command = "ssh kgadmin@{host} '{command}'".format(host=m_host, command=command.replace("'","\\'"))
    success = execute_wait(ssh_command, show_output)
    return success


# execute a command and wait
def execute_wait(command, show_output):
    if show_output:
        process = subprocess.Popen(command, shell=True)
    else:  
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)        

    process.wait()
    success = process.returncode == 0
    return success
