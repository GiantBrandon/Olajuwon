import styled from '@emotion/styled'

export const CenteredDiv = styled.div({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
})

export const LeftCenteredDiv = styled.div({
	position: 'absolute',
	top: '50%',
	left: '25%',
	transform: 'translate(-50%, -50%)',
})

export const spacing = {
	smallest: 6,
	smaller: 12,
	medium: 24,
	large: 36,
	larger: 48,
	largest: 60,
}
