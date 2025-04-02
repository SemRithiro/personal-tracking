import React from 'react';

import { Select } from '@chakra-ui/react';

export default function CustomSelect({ field, label, placeholder, options, clearable, children, ...props }) {
	return (
		<Select.Root {...props} value={field.value} onValueChange={({ value }) => field.onChange(value)} onInteractOutside={() => field.onBlur()} collection={options}>
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
					{options.items.map((egp) => (
						<Select.Item item={egp} key={egp.value}>
							{egp.label}
							<Select.ItemIndicator />
						</Select.Item>
					))}
				</Select.Content>
			</Select.Positioner>
		</Select.Root>
	);
}
