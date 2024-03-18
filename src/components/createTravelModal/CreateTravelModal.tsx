import { Button, Group, Modal, TextInput, Textarea } from '@mantine/core';
import { useCallCreateModal } from '../../store/useCallCreateModal';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { DatePickerInput } from '@mantine/dates';

import {useMutation, QueryClient} from '@tanstack/react-query';
import { AddTripDto } from '@FullStackMap/from-a2b';

import { TripController } from '../../services/BaseApi';
import { AuthStore, useAuthStore } from '../../store/useAuthStore.ts'

import { useNavigate } from 'react-router-dom'

const queryClient = new QueryClient();

const CreateTravelModal = () => {
  const navigate = useNavigate();
  const isOpen = useCallCreateModal((state) => state.status);
  const close = useCallCreateModal((state) => state.setStatus);
  const userId = useAuthStore((s: AuthStore) => s.user?.Id);


  const travelSchema = z.object({
    title: z.string().min(3, 'Vôtre titre dois avoir au minimun 3 caractères').max(50, 'Vôtre titre ne doit pas dépasser 50 caractères'),
    description: z.string(),
    dates: z.array(z.date().nullable().refine(value => value !== null, {
      message: "Les dates sont obligatoires",
    })
    ),
  });

  const travelForm = useForm({
    validateInputOnChange: true,
    validate: zodResolver(travelSchema),
    initialValues: {
      title: '',
      description: '',
      dates: [null, null],
    },
  });

  const createTravel = useMutation({
    mutationFn: (data:AddTripDto)=>TripController.addTripPOST(data).catch((error) => {
      throw new Error(error);
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTripsUser'] })
      navigate('/editTravel');
    },
    onError: (error) => {
      console.log(error);
    }
  });

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={() => close(false)}
        centered
        title="Modal size auto"
        closeOnClickOutside={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
        <form  onReset={() => travelForm.reset()}>
          <TextInput
            label="Title"
            placeholder="Title"
            required
            {...travelForm.getInputProps('title')}
          />
          <Textarea
            mt="sm"
            label="Description"
            placeholder="Description"
            {...travelForm.getInputProps('description')}
          />
          <DatePickerInput
            type="range"
            label="Pick dates range"
            placeholder="Pick dates range"
            clearable
            defaultLevel="year"
            {...travelForm.getInputProps('dates')}
          />

          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              mt="sm"
              disabled={!travelForm.isValid()}
              onClick={(event)=>{
                event.preventDefault();
                createTravel.mutate({
                  name: travelForm.values.title,
                  description: travelForm.values.description,
                  userId: userId,
                  startDate: travelForm.values.dates[0] as unknown as string,
                  endDate: travelForm.values.dates[1] as unknown as string,
                });
              }}>
              Sauvegarder
            </Button>
          </Group>
        </form>
      </Modal>

    </>
  );
}


export default CreateTravelModal;