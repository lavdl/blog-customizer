import { useEffect } from 'react';

type UseCloseOverlay = {
	formRef: React.RefObject<HTMLElement>;
	isOpen: boolean;
	setOpen: (isOpen: boolean) => void;
};

export const useCloseOverlay = ({
	formRef,
	isOpen,
	setOpen,
}: UseCloseOverlay) => {
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
	}, [isOpen, formRef, setOpen]);
};
