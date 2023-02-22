import classNames from 'classnames/bind'
import styles from './app.module.scss'
import { Progress } from './components'
import Marquee from 'react-fast-marquee'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsPause, BsPlay } from 'react-icons/bs'
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
import { useEffect, useRef, useState } from 'react'
import { TfiMusicAlt } from 'react-icons/tfi'
import { TiArrowBackOutline } from 'react-icons/ti'
import { IoIosMore } from 'react-icons/io'

import data from './data'
const cx = classNames.bind(styles)

function App() {
	const MAX_PROGRESS_VALUE = 360
	const MIN_PROGRESS_VALUE = 0
	const STEP_PROGRESS_VALUE = 1

	const viewUri = 'https://source.unsplash.com/random'

	// const DEFAULT_PROGRESS_VALUE = 0

	const [play, setPlay] = useState(false)

	const [currentMusic, setCurrentMusic] = useState(data[0])
	const [currentProgressValue, setCurrentProgressValue] = useState(0)

	const music = useRef()

	const handlePlayAndPause = () => {
		play ? music.current.pause() : music.current.play()
		setPlay(prev => !prev)
	}

	const handleProgressChangeValue = e => {
		music.current.currentTime =
			(e.target.value / MAX_PROGRESS_VALUE) * music.current.duration
		setCurrentProgressValue(e.target.value)
	}

	const handleAudioTimeupdate = e => {
		const newProgressValue = Math.floor(
			(music.current.currentTime / music.current.duration) *
				MAX_PROGRESS_VALUE
		)
		setCurrentProgressValue(newProgressValue)
	}
	const handleSelectMusic = item => {
		setCurrentMusic(item)
	}

	const handleNextMusic = e => {
		const nextMusic = data.find(el => el.id === currentMusic.id + 1)
		if (nextMusic) {
			setCurrentMusic(nextMusic)
		}
	}

	const handlePrevMusic = e => {
		const prevMusic = data.find(el => el.id === currentMusic.id - 1)
		if (prevMusic) {
			setCurrentMusic(prevMusic)
		}
	}

	//reload
	useEffect(() => {
		play ? music.current.play() : music.current.pause()
		setCurrentProgressValue(0)
	}, [currentMusic])

	/**
	 *  device   23.6rem X 50rem
	 *
	 *
	 *  !view 1
	 *
	 *  des h-[12rem]
	 *
	 *
	 *
	 *
	 *
	 */
	return (
		<div
			className={cx(
				'flex items-center justify-center w-[100vw] h-[100vh] bg-[#4a4141cc] '
			)}>
			<div
				className={cx(
					'w-[120rem] h-[90%] bg-[#F3FCFD] rounded-[0.8rem] relative overflow-hidden flex items-center justify-center'
				)}>
				<div
					className={cx(
						'absolute rounded-full aspect-[1/1] w-[50rem] bg-[#BBE6F3] right-[-10rem] top-[-8rem]'
					)}></div>
				<div
					className={cx(
						'absolute rounded-full aspect-[1/1] w-[16rem] bg-[#BBE6F3] left-[-7rem] top-[12rem]'
					)}></div>
				<div
					className={cx(
						'absolute rounded-full aspect-[1/1] w-[40rem] bg-[#EBC7E5] bottom-[-8rem] left-[-4rem]'
					)}></div>
				<div
					className={cx(
						'absolute rounded-full aspect-[1/1] w-[20rem] bg-[#EBC7E5] bottom-[2rem] right-[-2rem]'
					)}></div>
				<div
					className={cx(
						'z-10  w-auto h-full bg-transparent grid grid-cols-2 gap-[10rem]'
					)}>
					{/* view1 */}
					<div
						className={cx(
							'h-[50rem] w-[23.6rem] rounded-[3rem] overflow-hidden flex flex-col',
							'relative shadow'
						)}>
						<img
							src={currentMusic.img}
							alt='view'
							className={cx(
								'w-full h-full absolute object-cover z-[-1] '
							)}
						/>
						<div className={cx('')}></div>
						{/* music list */}

						<div
							className={cx('grow p-[1.2rem] h-[38rem] backdrop-blur ')}>
							<div
								className={cx(
									'flex justify-center items-center py-[1rem]  text-white'
								)}>
								<i
									className={cx(
										'cursor-pointer mr-[0.8rem] font-extrabold'
									)}>
									<TfiMusicAlt />
								</i>
								<h1 className={cx('italic capitalize font-bold')}>
									simple music
								</h1>
							</div>

							<ul
								className={cx(
									'overflow-y-auto max-h-[26rem] px-[0.8rem]'
								)}>
								{data.map(item => {
									const { id, name, img, artist } = item

									return (
										<li
											key={id}
											className={cx(
												'cursor-pointer mt-[0.4rem] flex items-center bg-transparent text-white',
												'item-shadow'
											)}>
											<div
												className={cx(
													'flex items-center  overflow-hidden h-[3.6rem] '
												)}
												onClick={e => {
													handleSelectMusic(item)
												}}>
												<div
													className={cx(
														'w-[3.6rem] h-[3.6rem] overflow-hidden rounded-[0.8rem]'
													)}>
													<img
														src={img}
														alt={name}
														className={cx(
															'w-full h-full object-cover'
														)}
													/>
												</div>
												<div className={cx('pl-[0.8rem]')}>
													<p
														className={cx(
															'w-[12rem] truncate text-[1.2rem] font-medium pr-[0.8rem]'
														)}>
														{name}
													</p>
													<h1 className={cx('text-[1rem]')}>
														{artist}
													</h1>
												</div>
											</div>
											<div
												className={cx(
													'flex items-center justify-center grow '
												)}>
												<i
													className={cx(
														'flex items-center justify-center cursor-pointer ',
														'text-[1.4rem] text-[#C5C7DA] hover:text-black'
													)}>
													<AiOutlineHeart />
												</i>
											</div>
										</li>
									)
								})}
							</ul>
						</div>

						{/* description */}
						<div
							className={cx(
								'h-[12rem] w-full bg-[#BBE6F3] rounded-[2.4rem] flex flex-col'
							)}>
							<div
								className={cx('flex-1 flex px-[1.2rem] items-center')}>
								<div
									className={cx(
										'w-[4rem]  h-[4rem] overflow-hidden rounded-full'
									)}>
									<img
										className={cx('w-full h-full object-cover')}
										src={currentMusic.img}
										alt={currentMusic.img}
									/>
								</div>

								<div className={cx('ml-[1rem] w-[13rem] ')}>
									<div
										className={cx(
											'capitalize text-[1.3rem] font-medium'
										)}>
										<Marquee
											className={cx('')}
											play={play}
											speed={'50'}
											gradient={false}>
											{currentMusic.name}
										</Marquee>
									</div>
									<h1 className={cx('text-[1rem]')}>Bob Moses</h1>
								</div>
							</div>

							{/* control */}

							<div
								className={cx(
									'h-[5.6rem] bg-[#FFFFFF] rounded-[2.4rem] relative'
								)}>
								<div
									className={cx(
										'absolute top-[0] left-0 w-full flex justify-center items-center'
									)}>
									<Progress
										className={cx('w-[19.5rem]')}
										min={MIN_PROGRESS_VALUE}
										max={MAX_PROGRESS_VALUE}
										step={STEP_PROGRESS_VALUE}
										value={currentProgressValue}
										onChange={handleProgressChangeValue}
									/>
								</div>
								<div
									className={cx(
										'w-full h-full flex justify-center items-center text-[#C5C7DA]'
									)}>
									<i
										className={cx('cursor-pointer text-[2.2rem]')}
										onClick={handlePrevMusic}>
										<MdOutlineKeyboardArrowLeft />
									</i>
									<i
										onClick={handlePlayAndPause}
										className={cx(
											'cursor-pointer text-[3.8rem] pl-[2rem] pr-[2rem] ',
											' flex items-center'
										)}>
										{play ? <BsPause /> : <BsPlay />}
									</i>
									{/* <i>
											
										</i> */}
									<i
										className={cx('cursor-pointer text-[2.2rem]')}
										onClick={handleNextMusic}>
										<MdOutlineKeyboardArrowRight />
									</i>
									{/* <i>
											<AiOutlineReload />
										</i> */}
								</div>
							</div>
						</div>
					</div>

					{/* view2  */}
					<div
						className={cx(
							' h-[50rem] w-[23.6rem] rounded-[3rem] overflow-hidden',
							'shadow flex flex-col relative'
						)}>
						<img
							src={viewUri}
							alt='view'
							className={cx(
								'w-full h-full absolute object-cover z-[-1] blur-[0.2rem] hidden'
							)}
						/>
						<div
							className={cx(
								'grow flex items-center justify-center px-[1.2rem]'
							)}>
							<i
								className={cx(
									'flex items-center justify-center cursor-pointer hover:text-[#d946ef]'
								)}>
								<TiArrowBackOutline />
							</i>

							<div
								className={cx('grow flex items-center justify-center')}>
								<h1 className={cx('capitalize font-bold')}>
									now playing
								</h1>
							</div>
							<i
								className={cx(
									'flex items-center justify-center cursor-pointer hover:text-[#d946ef]'
								)}>
								<IoIosMore />
							</i>
						</div>

						<div
							className={cx(
								'h-[42rem] rounded-l-[3rem] rounded-r-[3rem] bg-white'
							)}>
							<div
								className={cx(
									'overflow-hidden w-[16rem] aspect-[1/1] rounded-full relative'
								)}>
								<img
									src={currentMusic.img}
									alt={currentMusic.name}
									className={cx(
										'object-cover w-full h-full z-0 hidden'
									)}
								/>
								<div
									className={cx(
										'absolute bottom-0 left-0 right-0 top-0 z-50'
									)}>
									<i className={cx('text-[3.2rem]')}>
										<BsPlay />
									</i>
								</div>
							</div>
						</div>
					</div>

					{/* audio play */}
					<audio
						src={currentMusic.audio}
						// src={t}
						onTimeUpdate={handleAudioTimeupdate}
						controls
						ref={music}
						className={cx('invisible')}></audio>
				</div>
			</div>
		</div>
	)
}

export default App
