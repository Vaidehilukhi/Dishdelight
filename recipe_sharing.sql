-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2025 at 08:41 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipe_sharing`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `message`, `createdAt`) VALUES
(1, 'ok', 'ooo@gmail.com', 'jnjoijiijo', '2025-12-16 17:54:41'),
(2, 'ad', 'da@gmail.com', '6', '2025-12-16 19:20:30');

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `ingredients` text DEFAULT NULL,
  `instructions` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT 'Other'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id`, `title`, `description`, `ingredients`, `instructions`, `image`, `userId`, `userName`, `category`) VALUES
(7, 'Paneer Butter Masala', 'A rich and creamy North Indian curry made with soft paneer cubes simmered in a spiced tomato, butter, and cashew sauce. Best served with naan or jeera rice.', '250g paneer (cubed), 2 tbsp butter, 1 tbsp oil, 2 onions (finely chopped), 2 tomatoes (pureed), 1 tbsp ginger-garlic paste, 10-12 cashews (soaked and ground to paste), 1/2 cup fresh cream, 1 tsp garam masala, 1 tsp red chili powder, salt, coriander leaves', 'Heat oil and butter in a pan. Sauté onions until golden brown, then add ginger-garlic paste and cook for 1 minute.\n\nAdd tomato puree, chili powder, and salt. Cook until oil separates from the masala.\n\nStir in the cashew paste and cook for another 2 minutes. Add water to adjust consistency if needed.\n\nAdd the paneer cubes, garam masala, and fresh cream. Simmer gently for 5 minutes.\n\nGarnish with fresh coriander and a dollop of butter before serving.', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80', 6, 'dev', 'Other'),
(8, 'Vegetable Fried Rice', 'A quick Indo-Chinese favorite loaded with crunchy vegetables and soy sauce. It is a perfect way to use leftover rice.', '2 cups cooked rice (cooled), 2 tbsp oil, 1 tbsp minced garlic, 1/2 cup chopped carrots, 1/2 cup chopped french beans, 1/2 cup capsicum, 2 tbsp soy sauce, 1 tsp vinegar, 1/2 tsp black pepper, spring onions', 'Heat oil in a wok or large pan over high heat. Add minced garlic and sauté for 30 seconds.\n\nAdd carrots, beans, and capsicum. Stir-fry on high heat for 2-3 minutes so veggies stay crunchy.\n\nAdd the cooked rice, soy sauce, vinegar, black pepper, and salt.\n\nToss everything together quickly on high heat for 2 minutes to mix flavors evenly.\n\nGarnish with chopped spring onions and serve hot.', 'https://shwetainthekitchen.com/wp-content/uploads/2023/06/veg-fried-rice.jpg', 6, 'dev', 'Other'),
(9, 'Spicy Penne Arrabbiata', 'A classic Italian pasta dish made with a spicy tomato sauce infused with garlic and red chili flakes. It is simple, fiery, and completely vegetarian.', '250g penne pasta, 2 tbsp olive oil, 3 cloves garlic (minced), 2 cups crushed tomatoes or tomato puree, 1 tsp red chili flakes, fresh basil leaves, salt, parmesan cheese (optional)', 'Boil penne in salted water until al dente, then drain (save a little pasta water).\n\nHeat olive oil in a pan over medium heat. Sauté garlic and red chili flakes for 1 minute (do not burn).\n\nAdd the crushed tomatoes and salt. Simmer the sauce for 10-15 minutes until thickened.\n\nToss the boiled pasta into the sauce. Add a splash of pasta water if it\'s too dry.\n\nStir in fresh basil leaves and serve hot.', 'https://www.recipetineats.com/tachyon/2023/10/Penne-Arrabbiata-4.jpg', 7, 'vaidehi ', 'Other'),
(10, 'Crispy Aloo Tikki (Potato Patties)', 'A popular Indian street food snack. These spiced potato patties are crispy on the outside and soft on the inside, perfect for tea time.', '4 large potatoes (boiled and mashed), 1/2 cup green peas (boiled), 2 green chilies (chopped), 1 tsp chaat masala, 1/2 tsp red chili powder, 3 tbsp cornflour or breadcrumbs, salt, oil for shallow frying', 'In a large bowl, mix the mashed potatoes, boiled peas, green chilies, spices, salt, and cornflour.\n\nMix well to form a dough-like consistency.\n\nDivide the mixture into equal parts and shape them into round, flat patties (tikkis).\n\nHeat oil in a pan. Shallow fry the patties on medium heat until golden brown and crispy on both sides.\n\nServe hot with green chutney or ketchup.', 'https://www.seriouseats.com/thmb/iGjj5YgyBmeLcPb9KAB_h46SZZQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20220303-aloo-tikki-vicky-wasik-24-6895c79edeee4e618e5fc7a1d39e85a0.jpg', 7, 'vaidehi ', 'Other'),
(11, 'Eggless Fluffy Pancakes', 'Soft and airy pancakes made without eggs. These are perfect for a vegetarian breakfast, lightly sweetened and vanilla-scented.', '1.5 cups all-purpose flour, 1 tbsp sugar, 1 tbsp baking powder, 1/4 tsp salt, 1.25 cups milk, 2 tbsp melted butter, 1 tsp vanilla extract', 'In a bowl, whisk together flour, sugar, baking powder, and salt.\n\nSlowly pour in the milk, melted butter, and vanilla. Whisk gently until just combined (batter should still be slightly lumpy).\n\nLet the batter rest for 5 minutes.\n\nHeat a non-stick pan over medium heat and grease lightly. Pour a ladle of batter onto the pan.\n\nCook until bubbles appear on top, then flip and cook the other side until golden brown. Serve with syrup.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBommF7ynm8vMqaoAXE2jNJ1sRNpFxgkg8WQ&s', 18, 't', 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `recipeId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `recipeId`, `userId`, `userName`, `rating`, `comment`, `createdAt`) VALUES
(5, 8, 7, 'vaidehi ', 4, 'delicious\n', '2025-12-16 18:59:54'),
(6, 8, 7, 'vaidehi ', 4, '', '2025-12-16 19:01:43'),
(7, 8, 7, 'vaidehi ', 5, '', '2025-12-16 19:01:49'),
(8, 7, 7, 'vaidehi ', 4, '', '2025-12-16 19:01:57'),
(9, 7, 7, 'vaidehi ', 5, '', '2025-12-16 19:02:08'),
(10, 9, 7, 'vaidehi ', 3, '', '2025-12-16 19:02:20'),
(11, 10, 7, 'vaidehi ', 5, '', '2025-12-16 19:02:31'),
(12, 10, 18, 't', 5, '', '2025-12-16 19:04:23'),
(13, 9, 18, 't', 4, '', '2025-12-16 19:04:32');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `otpExpires` bigint(20) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phoneNumber`, `otp`, `otpExpires`, `role`) VALUES
(4, 'devarshi nayee', 'nayeefamily123@gmail.com', '123456789', '+9107096964496', NULL, NULL, 'admin'),
(6, 'dev', 'dev@gmail.com', '123', '+91123456789', NULL, NULL, 'user'),
(7, 'vaidehi ', 'vaid@gmail.com', '123', '+91123', NULL, NULL, 'user'),
(18, 't', 't@gmail.com', '123', '+91123123', NULL, NULL, 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipeId` (`recipeId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phoneNumber` (`phoneNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`recipeId`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
