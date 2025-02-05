import { Module } from "@nestjs/common";
import { AwsSecurityService } from "./aws-security.service";
import { AwsSecurityController } from "./aws-security.controller";

@Module({
  controllers: [AwsSecurityController],
  providers: [AwsSecurityService],
})
export class AwsSecurityModule {}