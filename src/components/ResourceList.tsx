import { useState } from "react";
import { Table, TextInput, Pagination, Loader, Alert } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "./ResourceList.scss"; // Import SCSS file

interface Resource {
  url: any;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface ApiResponse {
  results: Resource[];
  count: number;
  next: string | null;
  previous: string | null;
}

const fetchResources = async (page: number): Promise<ApiResponse> => {
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  return response.json();
};

export const ResourceList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["resources", page],
    queryFn: () => fetchResources(page),
  });
  
  if (isLoading) return <Loader size="xl" />;
  if (isError)
    return (
      <Alert color="red">
        Error: {error instanceof Error ? error.message : "Failed to fetch data"}
      </Alert>
    );

  const filteredResources = data.results.filter((resource) =>
    resource.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="resource-container">
      <TextInput
        placeholder="Search resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <Table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Hair Color</th>
            <th>Skin Color</th>
            <th>Eye Color</th>
            <th>Birth Year</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {filteredResources.map((resource) => (
            <tr key={resource.name}>
              <td>
                <Link
                  to={`/resource/${resource.url.split("/").slice(-2, -1)[0]}`}
                  className="resource-link"
                >
                  {resource.name}
                </Link>
              </td>
              <td>{resource.height}</td>
              <td>{resource.mass}</td>
              <td>{resource.hair_color}</td>
              <td>{resource.skin_color}</td>
              <td>{resource.eye_color}</td>
              <td>{resource.birth_year}</td>
              <td>{resource.gender}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        total={Math.ceil(data.count / 10)}
        page={page}
        onChange={setPage}
        className="pagination"
      />
    </div>
  );
};
