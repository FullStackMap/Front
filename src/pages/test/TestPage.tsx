import { AddTripDto } from '@FullStackMap/from-a2b';
import { Center, Text } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { TripController } from '../../services/BaseApi';

const TestPage = () => {
  useDocumentTitle('From A2B - Test');

  const query = useQuery({
    queryKey: ['test'],
    queryFn: async () =>
      await TripController.addTripPOST({
        userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 's',
        description: 'string',
        startDate: undefined,
        endDate: undefined,
        backgroundPicturePath: 'string',
      } as AddTripDto),
  });

  return (
    <>
      <Center>
        {/* <Button onClick={handleNotify}>Default notification</Button> */}

        <Text>{query.isPending ? 'Loading...' : null}</Text>
        <Text>{query.isError ? 'ERROR' : "it's ok"}</Text>
      </Center>
    </>
  );
};

export default TestPage;
