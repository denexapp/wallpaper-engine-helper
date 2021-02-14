import { useIntl, MessageDescriptor, IntlFormatters } from 'react-intl';
import { MessageKey } from '../localization';

type ExtractOverloadThatReturnsString<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Function extends (...args: any) => any
  // eslint-disable-next-line @typescript-eslint/ban-types
> = ReturnType<Function> extends string ? Function : never;

export type TypedMessageDesciptor = MessageDescriptor & { id: MessageKey };
export type TypedMessageValues = Parameters<
  ExtractOverloadThatReturnsString<IntlFormatters['formatMessage']>
>[1];

const useTypedMessage = (
  descriptor: TypedMessageDesciptor,
  values?: TypedMessageValues
): string => {
  const intl = useIntl();
  return intl.formatMessage(descriptor, values);
};

export default useTypedMessage;
