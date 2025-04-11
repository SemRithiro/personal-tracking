import React from 'react';

import { Select, createListCollection } from '@chakra-ui/react';

export default function CustomSelect({ field, label, placeholder, options, clearable, additionalfn, children, ...props }) {
	const [selectOptions, setSelectOptions] = React.useState(createListCollection({ items: [] }));

	React.useEffect(() => {
		setSelectOptions(createListCollection({ items: options }));
	}, [options]);

	return (
		<Select.Root
			{...props}
			value={field.value ? field.value : field.id}
			onValueChange={({ value }) => {
				field.onChange(value);
				if (additionalfn) additionalfn();
			}}
			onInteractOutside={() => field.onBlur()}
			collection={selectOptions}
		>
			<Select.HiddenSelect />
			{label && <Select.Label>{label}</Select.Label>}
			<Select.Control>
				<Select.Trigger>
					<Select.ValueText placeholder={placeholder} />
				</Select.Trigger>
				<Select.IndicatorGroup>
					{clearable && <Select.ClearTrigger />}
					<Select.Indicator />
				</Select.IndicatorGroup>
			</Select.Control>
			<Select.Positioner>
				<Select.Content>
					{selectOptions.items.map((egp) => (
						<Select.Item item={egp} key={egp.value ? egp.value : egp.id}>
							{egp.label ? egp.label : egp.name}
							<Select.ItemIndicator />
						</Select.Item>
					))}
				</Select.Content>
			</Select.Positioner>
		</Select.Root>
	);
}
