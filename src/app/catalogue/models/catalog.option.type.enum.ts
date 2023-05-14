export enum CatalogOptionTypeEnum {
  array = 'array',
  number = 'number',
  boolean = 'boolean',
  text = 'text'
}

export const _catalogOptionTypes: any[] = [
  {viewValue: 'Список', value: CatalogOptionTypeEnum.array},
  {viewValue: 'Логическое значение', value: CatalogOptionTypeEnum.boolean},
  {viewValue: 'Текстовое значение', value: CatalogOptionTypeEnum.text},
  {viewValue: 'Числовое значение', value: CatalogOptionTypeEnum.number}
];

export const _numberTypes: any[] = [
  {viewValue: 'Целое число', value: 'integer'},
  {viewValue: 'Число с дробью', value: 'double'}
];

export const _textTypes: any[] = [
  {viewValue: 'Слова', value: 'string'},
  {viewValue: 'Символ', value: 'char'}
];
