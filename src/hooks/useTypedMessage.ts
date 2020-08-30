import { useIntl, MessageDescriptor, IntlFormatters } from 'react-intl'
import { MessageKey } from '../localization'

type ExtractOverloadThatReturnsString<Function extends (...args: any) => any> = ReturnType<Function> extends string ? Function : never

type Desciptor = MessageDescriptor & { id: MessageKey }
type Values = Parameters<ExtractOverloadThatReturnsString<IntlFormatters['formatMessage']>>[1]

const useTypedMessage = (descriptor: Desciptor, values?: Values): string => {
  const intl = useIntl()
  return intl.formatMessage(descriptor, values)
}

export default useTypedMessage
