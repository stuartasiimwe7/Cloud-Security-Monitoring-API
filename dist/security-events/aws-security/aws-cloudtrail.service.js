"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsCloudTrailService = void 0;
const common_1 = require("@nestjs/common");
const client_cloudtrail_1 = require("@aws-sdk/client-cloudtrail");
const config_1 = require("@nestjs/config");
let AwsCloudTrailService = class AwsCloudTrailService {
    constructor(configService) {
        this.configService = configService;
        this.cloudTrailClient = new client_cloudtrail_1.CloudTrailClient({
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID') || '',
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY') || '',
            },
        });
    }
    async getRecentSecurityEvents() {
        const command = new client_cloudtrail_1.LookupEventsCommand({
            MaxResults: 10,
        });
        try {
            const response = await this.cloudTrailClient.send(command);
            return response.Events || [];
        }
        catch (error) {
            console.error('Error fetching CloudTrail events:', error);
            throw new Error('Damn! It failed! Try again - Later');
        }
    }
};
exports.AwsCloudTrailService = AwsCloudTrailService;
exports.AwsCloudTrailService = AwsCloudTrailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AwsCloudTrailService);
//# sourceMappingURL=aws-cloudtrail.service.js.map