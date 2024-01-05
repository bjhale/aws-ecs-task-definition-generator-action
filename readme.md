# AWS ECS Task Definition Generator Action

<!-- action-docs-description -->
## Description

Generates an AWS ECS Task Definition
<!-- action-docs-description -->

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| --- | --- | --- | --- |
| container_definition_files | A list of container definitions that describe the different containers that make up your task. | `false` |  |
| container_definitions | Raw container definitions | `false` |  |
| cpu | The number of cpu units used by the task. | `false` |  |
| ephemeral_storage | The amount of ephemeral storage (in GB) to allocate for the task. | `false` |  |
| execution_role_arn | The Amazon Resource Name (ARN) of the task execution role that grants the Amazon ECS container agent permission to make AWS API calls on your behalf. | `false` |  |
| family | The family of your task definition, used as the definition name. | `false` |  |
| memory | The amount of memory (in MiB) used by the task. | `false` |  |
| network_mode | The Docker networking mode to use for the containers in the task. | `false` |  |
| requires_compatibilities | The task launch types that the task definition was validated against. | `false` |  |
| task_role_arn | The short name or full Amazon Resource Name (ARN) of the IAM role that containers in this task can assume. | `false` |  |
| volumes | The list of volumes in a task. | `false` |  |
<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| --- | --- |
| task_definition | The path to the file containing the generated task definition. |
| task_definition_raw | The task definition JSON as a string |
<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node20` action.
<!-- action-docs-runs -->


## Resources

  * [Task Definition Parameters (AWS)](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html)