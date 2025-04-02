import { Box, Input } from '@chakra-ui/react';
import React from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';

export default function ReactDatePicker(props) {
	return <DatePicker wrapperClassName='react-datepicker' {...props} calendarContainer={CustomContainer} customTimeInput={<CustomTimeInput />} />;
}

const CustomContainer = ({ className, children }) => {
	return (
		<Box p={5} bg='white' borderRadius='lg'>
			<CalendarContainer className={className}>
				<Box style={{ position: 'relative' }}>{children}</Box>
			</CalendarContainer>
		</Box>
	);
};

const CustomTimeInput = ({ value, onChange }) => <Input value={value} onChange={(e) => onChange(e.target.value)} onClick={(e) => e.target?.focus()} />;
