# import os
# import pandas as pd
#
# from kg_builder.kg_path import project_path
# from kg_builder.kg_path import munge_stage_01
# from kg_builder.kg_path import munge_stage_02
# from kg_builder.kg_path import munge_stage_03
# from kg_builder.kg_path import munge_stage_50
#
# munge_stage_02_path = os.path.join(project_path, munge_stage_02)
# munge_stage_50_path = os.path.join(project_path, munge_stage_50)
#
# clinical_trial_filename = "node_clinical_trial.csv"
# enrollment_status_filename = "node_enrollment_status.csv"
# phase_filename = "node_phase.csv"
# study_type_filename = "node_study_type.csv"
# healthy_volunteers_filename = "node_healthy_volunteers.csv"
# age_range_filename = "node_age_range.csv"
# sex_filename = "node_sex.csv"
# location_filename = "node_location.csv"
#
# relationship_filename = "relationship_all.csv"
#
#
# def process_data():
#     join_dfs(
#         munge_stage_01,
#         clinical_trial_filename,
#         munge_stage_01,
#         enrollment_status_filename,
#         "clinical_trial_HAS_ENROLLMENT_STATUS_enrollment_status.csv",
#         ["nct_id"],
#         ["overall_status"],
#     )
#     join_dfs(
#         munge_stage_01,
#         clinical_trial_filename,
#         munge_stage_01,
#         phase_filename,
#         "clinical_trial_HAS_PHASE_phase.csv",
#         ["nct_id"],
#         ["phase"],
#     )
#     join_dfs(
#         munge_stage_01,
#         clinical_trial_filename,
#         munge_stage_01,
#         study_type_filename,
#         "clinical_trial_HAS_STUDY_TYPE_study_type.csv",
#         ["nct_id"],
#         ["study_type"],
#     )
#     join_dfs(
#         munge_stage_01,
#         clinical_trial_filename,
#         munge_stage_01,
#         healthy_volunteers_filename,
#         "clinical_trial_HAS_INCLUSION_CRITERION_healthy_volunteers.csv",
#         ["nct_id"],
#         ["healthy_volunteers"],
#     )
#     join_dfs(
#         munge_stage_01,
#         clinical_trial_filename,
#         munge_stage_02,
#         age_range_filename,
#         "clinical_trial_HAS_INCLUSION_CRITERION_age_range.csv",
#         ["nct_id"],
#         ["age_range"],
#     )
#     join_dfs(
#         munge_stage_01,
#         clinical_trial_filename,
#         munge_stage_02,
#         sex_filename,
#         "clinical_trial_HAS_INCLUSION_CRITERION_sex.csv",
#         ["nct_id"],
#         ["gender"],
#     )
#     join_dfs(
#         munge_stage_01,
#         clinical_trial_filename,
#         munge_stage_03,
#         location_filename,
#         "clinical_trial_HAS_LOCATION_location.csv",
#         ["nct_id"],
#     )
#
#
# def join_dfs(
#     munge_lnode_stage_file_prefix,
#     lnode_filename,
#     munge_rnode_stage_file_prefix,
#     rnode_filename,
#     output_filename,
#     lnode_fields=[],
#     rnode_fields=[],
# ):
#     df_lnode = pd.read_csv(
#         project_path
#         + "/"
#         + munge_lnode_stage_file_prefix
#         + "/"
#         + munge_lnode_stage_file_prefix
#         + "_"
#         + lnode_filename
#     )
#     lnode_fields.append("new_id")
#     df_lnode = pd.DataFrame(df_lnode, columns=lnode_fields)
#     if lnode_fields == ["new_id"]:
#         df_lnode["start_new_id"] = df_lnode["new_id"]
#     else:
#         df_lnode = df_lnode.rename(index=str, columns={"new_id": "start_new_id"})
#
#     df_relationships = pd.read_csv(
#         munge_stage_02_path
#         + "/"
#         + munge_stage_02
#         + "_"
#         + relationship_filename
#     )
#     df_relationships = pd.DataFrame(
#         df_relationships, columns=["start_new_id", "end_new_id", "relationship_type"]
#     )
#
#     df_rnode = pd.read_csv(
#         project_path
#         + "/"
#         + munge_rnode_stage_file_prefix
#         + "/"
#         + munge_rnode_stage_file_prefix
#         + "_"
#         + rnode_filename
#     )
#     rnode_fields.append("new_id")
#     df_rnode = pd.DataFrame(df_rnode, columns=rnode_fields)
#     if rnode_fields == ["new_id"]:
#         df_rnode["end_new_id"] = df_rnode["new_id"]
#     else:
#         df_rnode = df_rnode.rename(index=str, columns={"new_id": "end_new_id"})
#
#     df_lnode_to_relationships = pd.merge(
#         df_lnode,
#         df_relationships,
#         on="start_new_id",
#         how="inner",
#     )
#
#     df_relationships_to_rnode = pd.merge(
#         df_relationships,
#         df_rnode,
#         on="end_new_id",
#         how="inner",
#     )
#
#     df_lnode_to_rnode = pd.merge(
#         df_lnode_to_relationships,
#         df_relationships_to_rnode,
#         on=["start_new_id", "end_new_id", "relationship_type"],
#         how="inner"
#     )
#
#     lnode_to_rnode_fields = list(df_lnode_to_rnode)
#     lnode_to_rnode_fields.remove("start_new_id")
#     lnode_to_rnode_fields.remove("end_new_id")
#     lnode_to_rnode_fields.remove("relationship_type")
#     df_lnode_to_rnode = pd.DataFrame(df_lnode_to_rnode, columns=lnode_to_rnode_fields)
#
#     df_lnode_to_rnode.to_csv(
#         munge_stage_50_path
#         + "/"
#         + munge_stage_50
#         + "_"
#         + output_filename
#         , index=False
#     )
