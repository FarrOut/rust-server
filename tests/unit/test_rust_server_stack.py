import aws_cdk as core
import aws_cdk.assertions as assertions

from rust_server.rust_server_stack import RustServerStack

# example tests. To run these tests, uncomment this file along with the example
# resource in rust_server/rust_server_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = RustServerStack(app, "rust-server")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
