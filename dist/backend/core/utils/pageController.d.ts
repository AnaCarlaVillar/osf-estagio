import { Request, Response } from "express";
type LoadDataFn = (req: Request, res: Response) => Promise<any> | any;
export declare const showPage: (relativeFrontendPath: string, loadData?: LoadDataFn) => (req: Request, res: Response) => Promise<void>;
export {};
//# sourceMappingURL=pageController.d.ts.map