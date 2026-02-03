import { Role } from "../../dist/generated";
import { AIService } from "../ai/ai.service";
import { AbsensiRepository } from "../repository/absensi.repository";
export declare class AIAssistantService {
    private absensiRepo;
    private aiService;
    constructor(absensiRepo: AbsensiRepository, aiService: AIService);
    evaluateAbsensi(absensiId: number, role: Role): Promise<void>;
    private buildPrompt;
    private getSpamLevel;
    private mapTone;
    private saveAndEmit;
}
//# sourceMappingURL=ai.assistant.service.d.ts.map