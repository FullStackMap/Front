import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Card } from '@mantine/core';

const ProfileForm = () => {
    const form = useForm({
        initialValues: { name: 'name', firstname:'firstname', email: 'email@mail.fr', age: 12 },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
        },
    });
        return (
        <Card>
            <Box maw={340} mx="auto">
                <form onSubmit={form.onSubmit(console.log)}>
                    <TextInput label="Nom" placeholder="Nom" {...form.getInputProps('name')} />
                    <TextInput label="Prénom" placeholder="Prénom" {...form.getInputProps('firstname')} />
                    <TextInput disabled mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                    <NumberInput
                        mt="sm"
                        label="Age"
                        placeholder="Age"
                        min={0}
                        max={99}
                        {...form.getInputProps('age')}
                    />
                    <Button type="submit" mt="sm">
                        Sauvegarder
                    </Button>
                </form>
            </Box>
        </Card>
    );
}

export default ProfileForm;