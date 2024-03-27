import { useDebouncedState } from '@mantine/hooks';
import { Group, TextInput, Textarea, Modal, Button } from '@mantine/core'
import { IconX } from '@tabler/icons-react'

import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

import { useCreateStepModalStore } from '../../store/useTripDetailsStore.ts'

export const CreateStepModal=()=> {

  const [value, setValue] = useDebouncedState('', 200, { leading: true });

  const isOpen = useCreateStepModalStore((state) => state.status);
  const close = useCreateStepModalStore((state) => state.setStatus);

  const stepSchema = z.object({
    title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères').max(50, 'Le titre doit contenir au maximum 50 caractères'),
    description: z.string(),
    // destination: z.object({ place: z.string(), coordinates: z.array(z.number()) }),
  });

  const stepForm = useForm({
    validateInputOnChange: true,
    validate: zodResolver(stepSchema),
    initialValues: {
      title: '',
      description: '',
    },
  });


  return (
      <Modal
        opened={isOpen}
        onClose={() => close(false)}
        centered
        title="Créer une étape de vôtre voyage"
        className="mantine-Modal-header"
        closeOnClickOutside={false}
        closeButtonProps={{
          icon: <IconX size={24} stroke={2} />,
        }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
        <div className="img-modal"></div>
        <form onReset={() => stepForm.reset()} className="form">
          <TextInput
            label="Titre de votre étape"
            placeholder="Titre"
            required
            data-autofocus
            {...stepForm.getInputProps('title')}
          />
          <Textarea
            mt="sm"
            label="Description"
            placeholder="Description"
            {...stepForm.getInputProps('description')}
          />

          <TextInput
            label="Destination"
            defaultValue={value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              console.log(value);
            }}
          />


          <Group justify="flex-end" mt="md">
            <Button mt="sm" onClick={()=>close(false)}>Annuler</Button>
            <Button
              type="submit"
              mt="sm"
              disabled={!stepForm.isValid()}
              onClick={()=>console.log("sending")}>
              Sauvegarder
            </Button>
          </Group>
        </form>
      </Modal>
  );
}