import { OptionsProps } from "./OptionsProps";

export interface ProjectProps {
    name: string,
    budget: number,
    category: OptionsProps,
    services: Array<string>,
}