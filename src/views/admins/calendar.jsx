import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import iCalendarPlugin from '@fullcalendar/icalendar';

import {
	Accordion,
	Avatar,
	Box,
	Button,
	Checkbox,
	Dialog,
	Image,
	Field,
	Fieldset,
	Flex,
	HStack,
	Input,
	RadioGroup,
	Text,
	Textarea,
	VStack,
	chakra,
	createListCollection,
	useDisclosure,
	InputGroup,
	NumberInput,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { IoMdAdd, IoMdShare } from 'react-icons/io';
import { IoTimeOutline } from 'react-icons/io5';
import moment from 'moment/moment';

import ReactDatePicker from '../../components/custom/ReactDatePicker';
import CustomSelect from '../../components/custom/CustomSelect';

import { Tooltip } from '../../components/ui/tooltip';
import { useSubscribedEvent } from '../../utils/hooks/event';

const events = [
	{ groupId: 'private', title: 'Testing private', start: new Date(), end: new Date(), allDay: true, color: '#CB3A32' },
	{ groupId: 'holiday', title: 'Testing Holiday', start: new Date(), end: new Date(), color: '#F9E065' },
	{ groupId: 'private', title: 'Testing private', start: new Date(), end: new Date(), color: '#CB3A32' },
	{ groupId: 'private', title: 'Testing private', start: new Date(), end: new Date(), color: '#CB3A32' },
	{ groupId: 'holiday', title: 'Testing Holiday', start: new Date(), end: new Date(), color: '#F9E065' },
	{ groupId: 'holiday', title: 'Testing Holiday', start: new Date(), end: new Date(), color: '#F9E065' },
];

export default function Calendar() {
	const toggleEventForm = useDisclosure();
	const toggleNewGroupForm = useDisclosure();

	const subscribeEvents = useSubscribedEvent();

	const eventGroupOptions = createListCollection({
		items: [
			{ value: 'private', label: 'Private', color: 'blue', colorCode: '#CB3A32', checked: true },
			{ value: 'holiday', label: 'Holiday', color: 'yellow', colorCode: '#F9E065', checked: true },
		],
	});

	const frequencyOptions = createListCollection({
		items: [
			{ value: 'daily', label: 'Daily' },
			{ value: 'weekly', label: 'Weekly' },
			{ value: 'monthly', label: 'Monthly' },
			{ value: 'yearly', label: 'Yearly' },
			{ value: 'custom', label: 'Custom' },
		],
	});

	const intervalOptions = createListCollection({
		items: [
			{ value: 'daily', label: 'Daily' },
			{ value: 'weekly', label: 'Weekly' },
			{ value: 'monthly', label: 'Monthly' },
			{ value: 'yearly', label: 'Yearly' },
		],
	});

	const eventForm = useForm({
		defaultValues: {
			title: '',
			location: '',
			description: '',
			url: '',
			eventGroupOption: [eventGroupOptions.at(0).value],
			start: new Date(moment()),
			end: new Date(moment().add(1, 'day')),
			startTime: new Date(moment()),
			endTime: new Date(moment().add(30, 'minutes')),
			allDay: false,
			frequencyOption: [],
			repeatInterval: 1,
			intervalOption: ['weekly'],
			repeatByDay: [moment().format('ddd').toUpperCase().substring(0, 2)],
			repeatEndOption: 'Never',
			On: new Date(moment()),
			After: 1,
		},
	});

	const groupForm = useForm({});

	const calendarForm = useForm({
		defaultValues: {
			...eventGroupOptions.items.reduce((acc, item) => {
				acc[item.value] = item.checked;
				return acc;
			}, {}),
		},
	});

	useEffect(() => {
		eventForm.setValue('repeatByDay', [moment(eventForm.getValues('start')).format('ddd').toUpperCase().substring(0, 2)]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [eventForm, eventForm.watch('start')]);

	const handleSubmitEvent = (data) => {
		console.log(data);
	};

	const handleSubmitGroup = (data) => {
		console.log(data);
	};

	return (
		<Flex w='100%'>
			<Box minW='300px' px={7} pt={10}>
				<Flex mb={5} alignItems='center' gapX={2}>
					<Image h='40px' src='/logo.png' />
					<Text fontSize='lg'>Personal Tracking</Text>
				</Flex>
				<Button
					onClick={() => {
						eventForm.reset();
						toggleEventForm.onToggle();
					}}
					size='md'
					shadow='md'
					mb={5}
					w='100%'
					color='secondary'
					bgColor='primary'
				>
					Create Event
				</Button>
				<Dialog.Root open={toggleEventForm.open} onEscapeKeyDown={toggleEventForm.onToggle} onInteractOutside={toggleEventForm.onToggle} size='xl' placement='top'>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Trigger />
							<Dialog.Header>
								<Dialog.Title>New Event</Dialog.Title>
							</Dialog.Header>
							<chakra.form w='100%' onSubmit={eventForm.handleSubmit(handleSubmitEvent)}>
								<Fieldset.Root>
									<Dialog.Body>
										<Fieldset.Content>
											<Flex w='100%' flexDirection='row' gapX={5}>
												<Flex w='43%' flexDirection='column' gapY={2}>
													<Field.Root invalid={eventForm.formState.errors.title}>
														<Field.Label>Event Title</Field.Label>
														<Input placeholder='Title' {...eventForm.register('title', { required: 'Event title is required.' })} />
														<Field.ErrorText>{eventForm.formState.errors.title?.message}</Field.ErrorText>
													</Field.Root>
													<Field.Root>
														<Field.Label>Location</Field.Label>
														<Input placeholder='Location' {...eventForm.register('location')} />
													</Field.Root>
													<Field.Root>
														<Field.Label>URL</Field.Label>
														<Input placeholder='URL' {...eventForm.register('url')} />
													</Field.Root>
													<Controller
														name='eventGroupOption'
														control={eventForm.control}
														render={({ field }) => <CustomSelect label='Event Group' placeholder='Event Group' options={eventGroupOptions} field={field} />}
													/>
													<Field.Root>
														<Field.Label>Description</Field.Label>
														<Textarea rows={4} placeholder='Description' {...eventForm.register('description')} />
													</Field.Root>
												</Flex>
												<Flex flex={1} flexDirection='column' gapY={4}>
													<Flex alignItems='flex-start' gapX='2'>
														<Field.Root w='fit-content'>
															<Field.Label>Start Date</Field.Label>
															<Controller
																control={eventForm.control}
																name='start'
																render={({ field }) => <ReactDatePicker dateFormat='MMMM d, yyyy' selected={field.value} onChange={field.onChange} withPortal />}
															/>
														</Field.Root>
														{eventForm.watch('allDay') ? (
															<Field.Root w='fit-content'>
																<Field.Label>End Date</Field.Label>
																<Controller
																	control={eventForm.control}
																	name='end'
																	render={({ field }) => (
																		<ReactDatePicker
																			dateFormat='MMMM d, yyyy'
																			minDate={new Date(moment(eventForm.watch('start')).add(1, 'day'))}
																			selected={field.value}
																			onChange={field.onChange}
																			withPortal
																		/>
																	)}
																/>
															</Field.Root>
														) : (
															<>
																<Field.Root w='fit-content'>
																	<Field.Label>Start time</Field.Label>
																	<Controller
																		control={eventForm.control}
																		name='startTime'
																		render={({ field }) => (
																			<ReactDatePicker
																				dateFormat='h:mm aa'
																				selected={field.value}
																				onChange={field.onChange}
																				showTimeSelectOnly
																				showTimeSelect
																				showTimeCaption={false}
																				timeIntervals={5}
																				withPortal
																			/>
																		)}
																	/>
																</Field.Root>
																<Field.Root w='fit-content'>
																	<Field.Label>End time</Field.Label>
																	<Controller
																		control={eventForm.control}
																		name='endTime'
																		render={({ field }) => (
																			<ReactDatePicker
																				dateFormat='h:mm aa'
																				selected={field.value}
																				onChange={field.onChange}
																				showTimeSelectOnly
																				showTimeSelect
																				showTimeCaption={false}
																				timeIntervals={5}
																				withPortal
																			/>
																		)}
																	/>
																</Field.Root>
															</>
														)}
													</Flex>
													<HStack>
														<Controller
															name='allDay'
															control={eventForm.control}
															render={({ field }) => (
																<Checkbox.Root {...field} w='160px' onCheckedChange={(e) => field.onChange(e.checked)} checked={field.value} variant='solid'>
																	<Checkbox.HiddenInput />
																	<Checkbox.Control />
																	<Checkbox.Label>All day Event</Checkbox.Label>
																</Checkbox.Root>
															)}
														/>
														<Controller
															name='frequencyOption'
															control={eventForm.control}
															render={({ field }) => <CustomSelect placeholder='Do not repeat' clearable options={frequencyOptions} field={field} />}
														/>
													</HStack>
													{eventForm.watch('frequencyOption').includes('custom') && (
														<VStack w='100%'>
															<HStack w='100%' alignItems='flex-start'>
																<Field.Root flexDirection='row' alignItems='center'>
																	<Field.Label>Every</Field.Label>
																	<Input min={1} step={1} type='number' {...eventForm.register('repeatInterval', { valueAsNumber: true })} />
																</Field.Root>
																<Controller
																	name='intervalOption'
																	control={eventForm.control}
																	render={({ field }) => <CustomSelect options={intervalOptions} field={field} />}
																/>
															</HStack>
															{eventForm.watch('intervalOption').includes('weekly') && !eventForm.watch('allDay') && (
																<Field.Root>
																	<Field.Label>Repeat on</Field.Label>
																	<Controller
																		name='repeatByDay'
																		control={eventForm.control}
																		render={({ field }) => (
																			<HStack mt={1}>
																				{['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map((day) => (
																					<Avatar.Root
																						onClick={(e) => {
																							if (field.value.includes(e.target.innerText)) {
																								field.onChange([...field.value.filter((d) => d !== e.target.innerText)]);
																							} else {
																								field.onChange([...field.value, e.target.innerText]);
																							}
																						}}
																						key={day}
																						cursor='pointer'
																						size='sm'
																						colorPalette={field.value.includes(day) ? 'blue' : 'gray'}
																					>
																						<Avatar.Fallback value={day} name={day.split('').join(' ')} />
																					</Avatar.Root>
																				))}
																			</HStack>
																		)}
																	/>
																</Field.Root>
															)}
														</VStack>
													)}
													{eventForm.watch('frequencyOption').length > 0 && (
														<Flex w='100%' flexDirection='column' gapY={2}>
															<Field.Root>
																<Field.Label>Ends</Field.Label>
																<Controller
																	name='repeatEndOption'
																	control={eventForm.control}
																	render={({ field }) => (
																		<RadioGroup.Root
																			onChange={(e) => {
																				if (['Never', 'On', 'After'].includes(e.target.value)) field.onChange(e.target.value);
																			}}
																			value={field.value}
																			variant='solid'
																			colorPalette='blue'
																		>
																			<VStack alignItems='flex-start'>
																				{['Never', 'On', 'After'].map((endType) => (
																					<RadioGroup.Item key={endType} value={endType}>
																						<RadioGroup.ItemHiddenInput />
																						<RadioGroup.ItemIndicator />
																						<RadioGroup.ItemText>{endType}</RadioGroup.ItemText>
																					</RadioGroup.Item>
																				))}
																			</VStack>
																		</RadioGroup.Root>
																	)}
																/>
															</Field.Root>
															{eventForm.watch('repeatEndOption') === 'On' && (
																<Controller
																	control={eventForm.control}
																	name={'On'}
																	render={({ field }) => <ReactDatePicker dateFormat='MMMM d, yyyy' selected={field.value} onChange={field.onChange} withPortal />}
																/>
															)}
															{eventForm.watch('repeatEndOption') === 'After' && (
																<Controller
																	control={eventForm.control}
																	name={'After'}
																	render={({ field }) => (
																		<NumberInput.Root min={1} name={field.name} value={field.value} onValueChange={({ value }) => field.onChange(value)}>
																			<NumberInput.Control />
																			<InputGroup startElement={<IoTimeOutline size={20} />}>
																				<NumberInput.Input />
																			</InputGroup>
																		</NumberInput.Root>
																	)}
																/>
															)}
														</Flex>
													)}
												</Flex>
											</Flex>
										</Fieldset.Content>
									</Dialog.Body>
									<Dialog.Footer>
										<Button onClick={toggleEventForm.onToggle} rounded='md' variant='subtle' colorPalette='gray'>
											Close
										</Button>
										<Button type='submit' rounded='md' variant='subtle' color='#5A9EF8' bgColor='#BADEFC'>
											Save
										</Button>
									</Dialog.Footer>
								</Fieldset.Root>
							</chakra.form>
						</Dialog.Content>
					</Dialog.Positioner>
				</Dialog.Root>
				<Accordion.Root multiple defaultValue={['myCalendar']}>
					<Accordion.Item value='myCalendar'>
						<Flex alignItems='center' gapX={2}>
							<Accordion.ItemTrigger justifyContent='space-between'>
								My Calendars
								<Accordion.ItemIndicator cursor='pointer' />
							</Accordion.ItemTrigger>
							<Tooltip content='New group'>
								<IoMdAdd size={23} cursor='pointer' onClick={toggleNewGroupForm.onToggle} color='gray' />
							</Tooltip>
							<Dialog.Root open={toggleNewGroupForm.open} onEscapeKeyDown={toggleNewGroupForm.onToggle} onInteractOutside={toggleNewGroupForm.onToggle} size='md' placement='top'>
								<Dialog.Backdrop />
								<Dialog.Positioner>
									<Dialog.Content>
										<Dialog.Trigger />
										<Dialog.Header>
											<Dialog.Title>New Group</Dialog.Title>
										</Dialog.Header>
										<chakra.form w='100%' onSubmit={groupForm.handleSubmit(handleSubmitGroup)}>
											<Fieldset.Root>
												<Dialog.Body>
													<Fieldset.Content>
														<Field.Root invalid={groupForm.formState.errors.name}>
															<Field.Label>Group Name</Field.Label>
															<Input placeholder='Group name' {...groupForm.register('name', { required: 'Group name is required' })} />
															<Field.ErrorText>{groupForm.formState.errors.name?.message}</Field.ErrorText>
														</Field.Root>
													</Fieldset.Content>
												</Dialog.Body>
												<Dialog.Footer>
													<Button onClick={toggleNewGroupForm.onToggle} rounded='md' variant='subtle' colorPalette='gray'>
														Close
													</Button>
													<Button type='submit' rounded='md' variant='subtle' color='#5A9EF8' bgColor='#BADEFC'>
														Save
													</Button>
												</Dialog.Footer>
											</Fieldset.Root>
										</chakra.form>
									</Dialog.Content>
								</Dialog.Positioner>
							</Dialog.Root>
						</Flex>
						{eventGroupOptions.items.map((item, calIndex) => (
							<Accordion.ItemContent key={calIndex}>
								<Controller
									control={calendarForm.control}
									name={item.value}
									render={({ field }) => (
										<Flex alignItems='center' justifyContent='space-between'>
											<Checkbox.Root cursor='pointer' my={1} onCheckedChange={(e) => field.onChange(e.checked)} checked={field.value} variant='solid' colorPalette={item.color}>
												<Checkbox.HiddenInput />
												<Checkbox.Control />
												<Checkbox.Label>{item.label}</Checkbox.Label>
											</Checkbox.Root>
											<Tooltip content='Share group'>
												<IoMdShare cursor='pointer' color='gray' />
											</Tooltip>
										</Flex>
									)}
								/>
							</Accordion.ItemContent>
						))}
					</Accordion.Item>
				</Accordion.Root>
			</Box>
			<Flex w='100%' flex={1}>
				<Box my={7} mr={7} p={10} bg='white' shadow='lg' borderRadius='2xl' w='100%'>
					{subscribeEvents.isSuccess && (
						<FullCalendar
							height='100%'
							buttonText={{ today: 'Today' }}
							titleFormat={{ month: 'long', year: 'numeric' }}
							headerToolbar={{ end: 'today prev,next' }}
							dayMaxEvents={3}
							eventDisplay='auto'
							initialView='dayGridMonth'
							plugins={[dayGridPlugin, iCalendarPlugin]}
							eventSources={[
								events.filter((event) =>
									Object.keys(calendarForm.watch())
										.filter((c) => calendarForm.getValues(c))
										.includes(event.groupId)
								),
								...subscribeEvents.data,
							]}
							eventTimeFormat={{ hour: 'numeric', minute: '2-digit', meridiem: true }}
						/>
					)}
				</Box>
			</Flex>
		</Flex>
	);
}
