import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchMoviesScreen from "./SearchMoviesScreen";
import TmdbService from "../../../../services/TmdbService";
import { t } from "i18next";
import i18n from "../../../../i18n";
import { MemoryRouter } from "react-router-dom";

// Mockea el servicio
jest.mock("../../../../services/TmdbService");

describe("SearchMoviesScreen", () => {
  test("renders SearchForm and not found message initially", () => {
    render(<SearchMoviesScreen />);

    expect(screen.getByLabelText("Buscar Películas")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Título de la Película")
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("screens.movies.search.not_found"))
    ).toBeInTheDocument();
  });

  test("renders movie list when search returns results", async () => {
    const mockMovies = [
      { id: 1, title: "Movie 1", popularity: 10 },
      { id: 2, title: "Movie 2", popularity: 20 },
    ];

    // Mockea la respuesta de la búsqueda
    TmdbService.searchMovies.mockResolvedValue(mockMovies);

    render(
      <MemoryRouter>
        <SearchMoviesScreen />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Título de la Película");
    fireEvent.change(input, { target: { value: "test query" } });

    // Espera a que los resultados se rendericen
    await waitFor(() => {
      expect(screen.queryByText("Nada por aquí 😓")).not.toBeInTheDocument();
      expect(screen.getByText("Movie 1")).toBeInTheDocument();
      expect(screen.getByText("Movie 2")).toBeInTheDocument();
    });
  });

  test("renders not found message when search returns no results", async () => {
    // Mockea la respuesta de la búsqueda con un array vacío
    TmdbService.searchMovies.mockResolvedValue([]);

    render(<SearchMoviesScreen />);

    const input = screen.getByPlaceholderText("Título de la Película");
    fireEvent.change(input, { target: { value: "test query" } });

    // Espera a que el mensaje de no encontrado se renderice
    await waitFor(() => {
      expect(screen.getByText("Nada por aquí 😓")).toBeInTheDocument();
    });
  });
});
