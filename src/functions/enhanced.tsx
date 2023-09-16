import { createElement } from 'react'
import { Falsy, truthy } from '@dowhileluke/fns'
import { concat } from './concat'

type HtmlTags = React.JSX.IntrinsicElements
type D = HtmlTags['div']

export function enhanced3<P extends Record<string, unknown>>() {
	return function bound<T extends keyof HtmlTags>(type: T, classFromProps: (props: P & HtmlTags[T]) => readonly [HtmlTags[T], Readonly<Array<string | Falsy>>]) {
		return function Enhanced(props: P & HtmlTags[T]) {
			const [htmlTagProps, conditionalClassNames] = classFromProps(props)
			const className = concat(...conditionalClassNames, htmlTagProps.className)

			return createElement(type, { ...htmlTagProps, className })
		}
	}
}

export function enhanced2<T extends keyof HtmlTags>(type: T) {
	return function partial<P extends Record<string, unknown>>(classFromProps: (props: P & HtmlTags[T]) => readonly [HtmlTags[T], Readonly<Array<string | Falsy>>]) {
		return function Enhanced(props: P & HtmlTags[T]) {
			const [htmlTagProps, conditionalClassNames] = classFromProps(props)
			const className = concat(...conditionalClassNames, htmlTagProps.className)

			return createElement(type, { ...htmlTagProps, className })
		}
	}
}

type FlexProps = {
	centered?: boolean;
}

export const Flex = enhanced3<FlexProps>()('div', ({ centered, ...props }) => {
	return [props, [
		centered && 'centered'
	]] as const
})

export const Flex2 = enhanced2('div')<FlexProps>(props => [props, []] as const)
