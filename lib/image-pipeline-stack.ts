import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { ImagePipeline } from "cdk-image-pipeline";

export class ImagePipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const image = ec2.MachineImage.latestAmazonLinux2023();

    const image = ec2.MachineImage.lookup({
      name: "ubuntu/images/*ubuntu-*-24.04-*",
      owners: ["amazon"],
      filters: { architecture: ["x86_64"] },
    });

    const machineImageConfig = image.getImage(this);
    const amiId = machineImageConfig.imageId;

    new ImagePipeline(this, "RustyPipeline", {
      components: [
        {
          document: "./lib/components/steamcmd.yml",
          name: "steamcmd",
          version: "0.0.1",
        },
        {
          document: "./lib/components/rust.yml",
          name: "rust",
          version: "0.0.1",
        },
      ],
      parentImage: amiId,
      ebsVolumeConfigurations: [
        {
          deviceName: "/dev/xvda",
          ebs: {
            // encrypted: true,
            // iops: 3000,
            // kmsKeyId: "alias/app1/key",
            volumeSize: 20,
            volumeType: "gp3",
            // throughput: 1000,
          },
        },
      ],
    });
  }
}
