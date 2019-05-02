from kg_builder.conf.config import get_sys_config
import time
import subprocess
import os

# kg_load.py
#
#   Uses the batch loader to load all data created by the builder to Neo4j.
#
#   The script will issue commands over SSH to the graph database server to:
#       - Stop the Neo4j service
#       - Delete the existing database file
#       - Load the CSV's using the batch importer
#       - Start the Neo4j service
#       - Wait for the database to become available
#
#   The script will return immediately on failure of any component.
#   NOTE: The database will be unavailable while this script is running.
#


m_host = ""
m_file_root = ""


def load():
    """Runs all Neo4j load steps."""
    global m_host
    global m_file_root

    start_time = time.time()    

    # Determines working env. Current values - STAGE or LOCAL.
    kg_env = os.environ.get('KG_ENV')
    m_host = get_sys_config('host', kg_env)
    m_file_root = get_sys_config('ct_csv_files_location_graphdb', kg_env)
    
    print("Stopping Neo4j...")
    success = stop_neo4j()
    if not success:
        print("stop_neo4j failed. Exiting load.")
        return
    print("Neo4j stopped.")

    print("Deleting database...")
    success = delete_database()
    if not success:
        print("delete_database failed. Exiting load.")
        return
    print("Database deleted.")

    print("Loading all CSV files...")
    success = load_all_csvs()
    if not success:
        print("load_all_csvs failed. Exiting load.")
        return
    print("All CSV files loaded.")
    
    print("Starting Neo4j...")
    success = start_neo4j()
    if not success:
        print("start_neo4j failed. Exiting load.")
        return
    print("Neo4j started.") 
    
    end_time = time.time()
    print("Load graph completed in " + str(round(end_time - start_time)) + " seconds.")


def load_all_csvs():
    """Loads CSV files to Neo4j"""
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
            --nodes:StudyType {file_root}/node_study_type.csv \
            --nodes:Year {file_root}/node_year.csv \
            --relationships {file_root}/relationship_all.csv \
        "
    """.format(file_root=m_file_root)
    success = execute_remote_wait(command, True)
    return success


def delete_database():
    """Delete the Neo4j database."""
    command = """
                sudo rm -rf /var/lib/neo4j/data/databases/graph.db                
            """    
    success = execute_remote_wait(command, True)    
    return success


def start_neo4j():
    """Starts the Neo4j service."""
    command = """
                sudo service neo4j start
            """    
    success = execute_remote_wait(command, True)  
    if not success : return false
    
    success = block_until_neo4j_available()
    return success


def stop_neo4j():
    """Stops the Neo4j service."""
    command = """
                sudo service neo4j stop
            """    
    success = execute_remote_wait(command, True)        
    return success


def block_until_neo4j_available():
    """Waits for Neo4j to start."""
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


def execute_remote_wait(command, show_output):
    """Executes a command to the server over ssh and waits."""
    ssh_command = "ssh kgadmin@{host} '{command}'".format(host=m_host, command=command.replace("'","\\'"))
    success = execute_wait(ssh_command, show_output)
    return success


def execute_wait(command, show_output):
    """Executes a command and waits."""
    if show_output:
        process = subprocess.Popen(command, shell=True)
    else:  
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)        

    process.wait()
    success = process.returncode == 0
    return success
