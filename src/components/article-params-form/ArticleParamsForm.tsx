import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, useEffect } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleProps = {
	setState: (data: ArticleStateType) => void;
	clearState: () => void;
};

export const ArticleParamsForm = (props: ArticleProps) => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [font, setFont] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setcontentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.setState({
			fontFamilyOption: font,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	};

	const handleClear = () => {
		props.clearState();
		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setcontentWidth(defaultArticleState.contentWidth);
	};

	useEffect(() => {
		const handleClickClose = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		if (isOpen) {
			document.addEventListener('mousedown', handleClickClose);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickClose);
		};
	}, [isOpen]);

	const toggleForm = () => {
		setOpen(!isOpen);
	};
	const changeFont = (selectedFont: OptionType) => {
		setFont(selectedFont);
	};

	const changeFontSize = (selectedFontSize: OptionType) => {
		setFontSize(selectedFontSize);
	};

	const changeFonColor = (selectedFontColor: OptionType) => {
		setFontColor(selectedFontColor);
	};

	const changeBackgroundColor = (selectedBackgroundColor: OptionType) => {
		setBackgroundColor(selectedBackgroundColor);
	};

	const changeContentWidth = (selectedcontentWidth: OptionType) => {
		setcontentWidth(selectedcontentWidth);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				ref={formRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<ul className={styles.topContainer}>
						<Text as='h1' size={31} weight={800} uppercase>
							задайте параметры
						</Text>
						<li>
							<Select
								selected={font}
								options={fontFamilyOptions}
								title='шрифт'
								onChange={changeFont}
							/>
						</li>
						<li>
							<RadioGroup
								selected={fontSize}
								options={fontSizeOptions}
								title='размер шрифта'
								onChange={changeFontSize}
								name='radioSize'
							/>
						</li>
						<li>
							<Select
								selected={fontColor}
								options={fontColors}
								title='цвет шрифта'
								onChange={changeFonColor}
							/>
						</li>
						<li>
							<Separator />
						</li>
						<li>
							<Select
								selected={backgroundColor}
								options={backgroundColors}
								title='цвет фона'
								onChange={changeBackgroundColor}
							/>
						</li>
						<li>
							<Select
								selected={contentWidth}
								options={contentWidthArr}
								title='ширина контента'
								onChange={changeContentWidth}
							/>
						</li>
					</ul>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleClear}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
