-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : db:3306
-- Généré le : lun. 10 mars 2025 à 12:29
-- Version du serveur : 8.0.30
-- Version de PHP : 8.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db_secured_webshop`
--
CREATE DATABASE IF NOT EXISTS `db_secured_webshop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `db_secured_webshop`;

-- --------------------------------------------------------

--
-- Structure de la table `t_users`
--

CREATE TABLE `t_users` (
  `user_id` int NOT NULL,
  `username` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` enum('user','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `t_users`
--

INSERT INTO `t_users` (`user_id`, `username`, `password_hash`, `salt`, `role`, `created_at`) VALUES
(35, 'zraidex', 'IFU@[ORydpCUjRRvX)XFj j', 'IBFmgDrrHtN28zKD', 'admin', '2025-02-24 13:31:19'),
(36, 'theo', 'IFU@[ORagF#J^JUdUU^RI@I', 'AybLY4YgBg1vro6c', 'user', '2025-02-24 13:33:17'),
(37, 'matod', 'CCXX[U@XaIDR^[FLGm5UCj', '62AoWf4undXER17D', 'user', '2025-02-24 13:33:40'),
(38, 'emma', 'XCX@CFLXX@FDgU@OOXOXLRdg', 'h68WCs6eehe2p0xC', 'user', '2025-02-24 13:33:48'),
(39, 'fraction', 'UI[R[UdOday|,DgR 5^UXX', 'xqBwIJOWCfKRjg22', 'user', '2025-02-24 13:34:01'),
(40, 'sourismalveillante', 'IFU@[CLOFOamm,UagF8sCjF)', 'nekEEOg5CnSG7z8N', 'user', '2025-02-24 13:34:09'),
(41, 'eliott', '@IFU@OaC>C/a)dFmFM[a|U', 'waUmPANx8E8Zi5Js', 'user', '2025-02-24 13:36:25'),
(42, 'bsahtek', 'FUCXXOaFUCXXOaUaU [X2mF)UA[jX^', '15gKutQE8N1VuDhj', 'user', '2025-02-24 13:36:41'),
(43, 'compte', 'CFFIFgCOL^mIgC CUC)O[aOC', 'pjE9CmKmsmNquwq7', 'user', '2025-02-24 13:36:48'),
(44, 'fredDeCarglas', 'FI[FI[RUCRIdFFvGF#5m#>#U', 'ar9x8bHX8LRELULg', 'user', '2025-02-24 13:37:00'),
(45, 'fakeAdmin', 'LC[XLa[a^[@2sCa8Ua^LpIC|aA', '6QGmwSsAvdFoaJAV', 'user', '2025-02-24 13:37:14'),
(46, 'test', 'XOUXjR#IyRXF/LaJa|^M', 'z0LcI0tbPdwYkJjZ', 'user', '2025-02-24 13:37:31'),
(48, 'mathis', 'test', '', 'user', '2025-02-24 13:44:07'),
(49, 'adawdaw', '$2b$10$5QciMuZp39sUSEsjdKR8duzCcVtA4X.P/yp9I.L6Fc1aADvBMrOyK', NULL, 'user', '2025-03-03 11:32:20'),
(50, 'Eliott2', '$2b$10$jEek7aqPnMzr/89.0qY5L.WjjP2zY5C2KxydlVSNXPFA4JovAmX8u', NULL, 'user', '2025-03-03 11:32:34'),
(77, 'FakeUser', 'ADJADHLWALDHALdhlakwhdAJKLhda', '', 'user', '2025-03-03 11:39:50');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `t_users`
--
ALTER TABLE `t_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `t_users`
--
ALTER TABLE `t_users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
