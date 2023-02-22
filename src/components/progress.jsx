import classNames from 'classnames/bind'
import { useEffect, useRef, useState, memo } from 'react'
import styles from '../app.module.scss'
const cx = classNames.bind(styles)

const Progress = memo(props => {
	const { min, max, defaultValue, className, step, onChange, value } = props

	// const [value, setValue] = useState(defaultValue)
	const progress = useRef()

	// const updateProgress = inputRange => {
	// 	var min = +inputRange.min || 0
	// 	var max = +inputRange.max || 100
	// 	var value = +inputRange.value
	// 	inputRange.style.setProperty(
	// 		'--background-size',
	// 		`${((value - min) / (max - min)) * 100}%`
	// 	)
	// }

	// useEffect(() => {
	// 	updateProgress(progress.current)
	// }, [progress])

	// useEffect(() => {
	// 	updateProgress(progress.current)
	// }, [value])

	useEffect(() => {
		progress.current.style.setProperty(
			'--background-size',
			`${((value || min - min) / (max - min)) * 100}%`
		)
	}, [value])

	return (
		<div className={cx('progress', `${className}`)}>
			<input
				onChange={e => {
					// updateProgress(e.target.value)
					// console.log('xx')
				}}
				value={value || min}
				type='range'
				ref={progress}
				min={min}
				max={max}
				step={step}
				// defaultValue={value}
				// defaultValue={value || defaultValue}
			/>
		</div>
	)
})

export { Progress }
