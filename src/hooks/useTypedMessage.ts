import { useIntl, MessageDescriptor, IntlFormatters } from 'react-intl'
import { MessageKey } from '../localization'

type ExtractOverloadThatReturnsString<Function extends (...args: any) => any> = ReturnType<Function> extends string ? Function : never

export type TypedMessageDesciptor = MessageDescriptor & { id: MessageKey }
export type TypedMessageValues = Parameters<ExtractOverloadThatReturnsString<IntlFormatters['formatMessage']>>[1]

const useTypedMessage = (descriptor: TypedMessageDesciptor, values?: TypedMessageValues): string => {
  const intl = useIntl()
  return intl.formatMessage(descriptor, values)
}

export default useTypedMessage
