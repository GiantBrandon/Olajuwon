export type Theme = {
  BG: string
  contrast: string
  parallel: string
  highlight: string
}

export const colors: Record<string, Theme> = {
	dark: {
		BG: '#262626',
		contrast: '#f5f5f5',
		parallel: '#3f3f3f',
		highlight: '#dcdcdc',
	},
	light: {
		BG: '#FFF',
		contrast: '#111',
		parallel: '#BBF',
		highlight: '#3f3f3f',
	},
}

export const shift = (
	color: string,
	R: number,
	G: number,
	B: number
): string => {
	const newR: number = parseInt(`0x${color.slice(1, 3)}`) + R
	const newG: number = parseInt(`0x${color.slice(3, 5)}`) + G
	const newB: number = parseInt(`0x${color.slice(5, 7)}`) + B
	return `#${newR.toString(16)}${newG.toString(16)}${newB.toString(16)}`
}
