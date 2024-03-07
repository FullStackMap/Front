import { useForm } from '@mantine/form';
import { PasswordInput, Group, Button, Box, Card } from '@mantine/core';
const ChangeEmailForm = () => {
    const form = useForm({
        initialValues: {
            email: 'secret',
            confirmEmail: 'sevret',
        },
        validate: {
            confirmEmail: (value, values) =>
                value !== values.email ? 'Passwords did not match' : null,
        },
    });

    return (
        <Card>
            <Box maw={340} mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <PasswordInput
                        label="Email"
                        placeholder="Email"
                        {...form.getInputProps('password')}
                    />

                    <PasswordInput
                        mt="sm"
                        label="Email Confirmer"
                        placeholder="Email Confirmer"
                        {...form.getInputProps('confirmPassword')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Envoyez</Button>
                    </Group>
                </form>
            </Box>
        </Card>
    )
}

export default ChangeEmailForm;