import { Builder, IBuilder } from '@shared/models/Builder';
import { SearchRule } from './SearchRule';
import { HackingRule } from './HackingRule';

export interface ISearchOption {

    id: string;

    description: string;

    value: any;

}

export class SearchOption implements ISearchOption {

    id: string;

    description: string;

    value: any;

    constructor() {}

    public static builder(): IBuilder<SearchOption> {
        return Builder<SearchOption>();
    }

    public static fromSearchRule(searchRule: SearchRule): SearchOption {
        return SearchOption.builder()
            .id(searchRule.id)
            .description(searchRule.description)
            .value(searchRule.value)
            .build();
    }

    public static fromHackingRule(hackingRule: HackingRule): SearchOption {
        return SearchOption.builder()
            .id(hackingRule.id)
            .description(hackingRule.description)
            .value(hackingRule.value)
            .build();
    }

}
