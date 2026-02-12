import { CategoryProps } from "./CategoryProps";

export interface ProjectProps {
    id: number,
    name: string,
    budget: number,
    category: CategoryProps,
    services: Array<string>,
}