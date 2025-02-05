"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsSecurityModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const aws_security_service_1 = require("./aws-security.service");
const aws_security_controller_1 = require("./aws-security.controller");
const security_event_entity_1 = require("../security-event.entity");
const aws_cloudtrail_service_1 = require("./aws-cloudtrail.service");
let AwsSecurityModule = class AwsSecurityModule {
};
exports.AwsSecurityModule = AwsSecurityModule;
exports.AwsSecurityModule = AwsSecurityModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([security_event_entity_1.SecurityEvent])],
        controllers: [aws_security_controller_1.AwsSecurityController],
        providers: [aws_security_service_1.AwsSecurityService, aws_cloudtrail_service_1.AwsCloudTrailService],
        exports: [aws_security_service_1.AwsSecurityService],
    })
], AwsSecurityModule);
//# sourceMappingURL=aws-security.module.js.map