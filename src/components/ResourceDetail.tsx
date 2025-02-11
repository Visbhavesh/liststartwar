import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Text, Loader, Alert, List, Title, Divider, Group, Container } from '@mantine/core';

interface Resource {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
}

interface Planet {
  name: string;
  terrain: string;
  population: string;
}

interface Film {
  title: string;
}

interface Species {
  name: string;
}

interface Vehicle {
  name: string;
}

interface Starship {
  name: string;
}

export const ResourceDetail = () => {
  const { id } = useParams();
  const [resource, setResource] = useState<Resource | null>(null);
  const [homeworld, setHomeworld] = useState<Planet | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [species, setSpecies] = useState<Species[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resourceResponse = await fetch(`https://swapi.dev/api/people/${id}`);
        const resourceData: Resource = await resourceResponse.json();
        setResource(resourceData);

        const homeworldResponse = await fetch(resourceData.homeworld);
        const homeworldData: Planet = await homeworldResponse.json();
        setHomeworld(homeworldData);

        const filmsData = await Promise.all(
          resourceData.films.map((url) => fetch(url).then((res) => res.json()))
        );
        setFilms(filmsData);

        const speciesData = await Promise.all(
          resourceData.species.map((url) => fetch(url).then((res) => res.json()))
        );
        setSpecies(speciesData);

        const vehiclesData = await Promise.all(
          resourceData.vehicles.map((url) => fetch(url).then((res) => res.json()))
        );
        setVehicles(vehiclesData);

        const starshipsData = await Promise.all(
          resourceData.starships.map((url) => fetch(url).then((res) => res.json()))
        );
        setStarships(starshipsData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Loader size="xl" />
      </Container>
    );

  if (error)
    return (
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Alert color="red">{error}</Alert>
      </Container>
    );

  if (!resource) return <div>No data found</div>;

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card
        shadow="xl"
        radius="md"
        style={{
          maxWidth: 800,
          width: '100%',
          padding: '20px',
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          color: '#ffffff', 
        }}
      >
        <Title align="center" order={1} style={{ color: '#FACC15', marginBottom: '20px' }}>
          {resource.name}
        </Title>

        <Divider my="md" color="gray" />

        <Group position="apart">
          <Text>
            <b>Height:</b> {resource.height} cm
          </Text>
          <Text>
            <b>Mass:</b> {resource.mass} kg
          </Text>
        </Group>

        <Group position="apart">
          <Text>
            <b>Hair Color:</b> {resource.hair_color}
          </Text>
          <Text>
            <b>Skin Color:</b> {resource.skin_color}
          </Text>
        </Group>

        <Group position="apart">
          <Text>
            <b>Eye Color:</b> {resource.eye_color}
          </Text>
          <Text>
            <b>Birth Year:</b> {resource.birth_year}
          </Text>
        </Group>

        <Text mt="sm">
          <b>Gender:</b> {resource.gender}
        </Text>

        {homeworld && (
          <Text mt="sm">
            <b>Homeworld:</b> {homeworld.name} (Terrain: {homeworld.terrain}, Population: {homeworld.population})
          </Text>
        )}

        <Divider my="lg" color="gray" />

        {films.length > 0 && (
          <>
            <Text size="lg" style={{ color: '#FACC15', marginBottom: '5px' }}>
              Films:
            </Text>
            <List spacing="xs" size="sm" style={{ color: '#E2E8F0' }}>
              {films.map((film, index) => (
                <List.Item key={index}>{film.title}</List.Item>
              ))}
            </List>
          </>
        )}

        {species.length > 0 && (
          <>
            <Text size="lg" style={{ color: '#FACC15', marginTop: '10px' }}>
              Species:
            </Text>
            <List spacing="xs" size="sm" style={{ color: '#E2E8F0' }}>
              {species.map((specie, index) => (
                <List.Item key={index}>{specie.name}</List.Item>
              ))}
            </List>
          </>
        )}

        {vehicles.length > 0 && (
          <>
            <Text size="lg" style={{ color: '#FACC15', marginTop: '10px' }}>
              Vehicles:
            </Text>
            <List spacing="xs" size="sm" style={{ color: '#E2E8F0' }}>
              {vehicles.map((vehicle, index) => (
                <List.Item key={index}>{vehicle.name}</List.Item>
              ))}
            </List>
          </>
        )}

        {starships.length > 0 && (
          <>
            <Text size="lg" style={{ color: '#FACC15', marginTop: '10px' }}>
              Starships:
            </Text>
            <List spacing="xs" size="sm" style={{ color: '#E2E8F0' }}>
              {starships.map((starship, index) => (
                <List.Item key={index}>{starship.name}</List.Item>
              ))}
            </List>
          </>
        )}
      </Card>
    </Container>
  );
};
