export type TypeImageExtensions = 'png' | 'jpg' | 'jpeg' | 'webp'

export interface IExpectImages {
  visible?: boolean;
  broken?: boolean;
  extension?: TypeImageExtensions;
}
