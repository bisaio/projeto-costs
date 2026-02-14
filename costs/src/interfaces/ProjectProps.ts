import { CategoryProps } from "./CategoryProps";
import { ServiceProps } from "./ServiceProps";

export interface ProjectProps {
    id: number,
    name: string,
    budget: number,
    spent: number,
    category: CategoryProps,
    services: Array<ServiceProps>,
}