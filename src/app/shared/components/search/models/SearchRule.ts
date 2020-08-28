import { Builder, IBuilder } from '@shared/models/Builder';
import { SearchOption } from './SearchOption';

export interface ISearchRule {

    id: string;

    description: string;

    value: any;
    
    keywords: string[];
    
}

export class SearchRule implements ISearchRule {

    id: string;

    description: string;

    value: any;
    
    keywords: string[];

    constructor(builder: any) {
        this.id = builder.id;
        this.description = builder.description;
        this.value = builder.value;
        this.keywords = builder.keywords;
    }

    private normalize(text: string): string {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    public matches(text: string): boolean {
        return this.keywords.some((keyword) => keyword.match(this.normalize(text.toLowerCase())));
    }

    public toSearchOption(): SearchOption {
        return SearchOption.fromSearchRule(this);
    }

    public static apply(text: string, rules: SearchRule[]): Array<SearchOption> {
        return rules.filter((v) => new SearchRule(v).matches(text))
                    .map<SearchOption>((v) => new SearchRule(v).toSearchOption());
    }

    public static builder(): IBuilder<SearchRule> {
        return Builder<SearchRule>();
    }

}
