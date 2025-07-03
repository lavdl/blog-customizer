import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
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
import { useCloseOverlay } from '../hooks/useCloseOverlay';

type ArticleProps = {
	setArticleState: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: ArticleProps) => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);
	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setState((prevState) => ({ ...prevState, [field]: value }));
		};
	};
	const formRef = useRef<HTMLFormElement>(null);

	useCloseOverlay({
		formRef,
		isOpen,
		setOpen,
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState(state);
	};

	const handleClear = () => {
		setArticleState(defaultArticleState);
		setState(defaultArticleState);
	};

	const toggleForm = () => {
		setOpen(!isOpen);
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
								selected={state.fontFamilyOption}
								options={fontFamilyOptions}
								title='шрифт'
								onChange={handleOnChange('fontFamilyOption')}
							/>
						</li>
						<li>
							<RadioGroup
								selected={state.fontSizeOption}
								options={fontSizeOptions}
								title='размер шрифта'
								onChange={handleOnChange('fontSizeOption')}
								name='radioSize'
							/>
						</li>
						<li>
							<Select
								selected={state.fontColor}
								options={fontColors}
								title='цвет шрифта'
								onChange={handleOnChange('fontColor')}
							/>
						</li>
						<li>
							<Separator />
						</li>
						<li>
							<Select
								selected={state.backgroundColor}
								options={backgroundColors}
								title='цвет фона'
								onChange={handleOnChange('backgroundColor')}
							/>
						</li>
						<li>
							<Select
								selected={state.contentWidth}
								options={contentWidthArr}
								title='ширина контента'
								onChange={handleOnChange('contentWidth')}
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
