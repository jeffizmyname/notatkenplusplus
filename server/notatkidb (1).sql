-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sty 06, 2024 at 02:55 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notatkidb`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `calendarevents`
--

CREATE TABLE `calendarevents` (
  `id` int(30) NOT NULL,
  `user_id` int(30) NOT NULL,
  `Data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`Data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notes`
--

CREATE TABLE `notes` (
  `id` int(30) NOT NULL,
  `user_id` int(30) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Author` varchar(32) NOT NULL,
  `Description` varchar(256) NOT NULL,
  `Data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`Data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `user_id`, `Name`, `Author`, `Description`, `Data`) VALUES
(1, 6, 'nowa notatka', 'stanoslaw', 'opisss', '{\"ops\":[{\"insert\":\"twój tekst... 123123123\\n\"}]}');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `todos`
--

CREATE TABLE `todos` (
  `id` int(3) NOT NULL,
  `user_id` int(3) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Author` varchar(32) NOT NULL,
  `Description` varchar(256) NOT NULL,
  `Data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `todos`
--

INSERT INTO `todos` (`id`, `user_id`, `Name`, `Author`, `Description`, `Data`) VALUES
(1, 6, 'asd', 'asd', 'asd', '[{\"isDone\":true,\"task\":\"bjkbkj\"},{\"isDone\":true,\"task\":\"kjhjh\"},{\"isDone\":false,\"task\":\"nowa\"},{\"isDone\":false,\"task\":\"eee\"}]'),
(2, 6, 'nowa test lista', 'stanislaw', 'opis listy v2', NULL),
(4, 6, 'test v3', 'stas', 'opisssssssssssssssssss', '[{\"isDone\":false,\"task\":\"tests\"}]'),
(5, 6, 'test v4', 'stas', 'nowy opis v4444444', '[{\"isDone\": false, \"task\": \"\"}]'),
(6, 6, 'test v5', 'stat', 'opisek jak zawse ', '[{\"isDone\": false, \"task\": \"\"}]'),
(7, 6, 'nowa notakta ', 'stanislaw', 'opis', '[{\"isDone\": false, \"task\": \"\"}]');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(39) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `newsletter` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`, `newsletter`) VALUES
(6, 'jan', 'kowalski', 'jan@jan.jan', '9c4f6649c1ddedea34f8ba3c78ee656d', 1),
(12, 'jan', 'jnas', 'antek@antek.antek', '9c4f6649c1ddedea34f8ba3c78ee656d', 1),
(13, 'jan', 'jan', 'antek@antek.antek', '9c4f6649c1ddedea34f8ba3c78ee656d', 1),
(14, 'jan', 'jan', 'dupa@dupa.pl', '9c4f6649c1ddedea34f8ba3c78ee656d', 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `calendarevents`
--
ALTER TABLE `calendarevents`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calendarevents`
--
ALTER TABLE `calendarevents`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
