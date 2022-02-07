/*
 Navicat Premium Data Transfer

 Source Server         : bullsdb
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : localhost:3306
 Source Schema         : bullsdb

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : 65001

 Date: 08/02/2022 03:08:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_list
-- ----------------------------
DROP TABLE IF EXISTS `admin_list`;
CREATE TABLE `admin_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sur_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mobile` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `last_login` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sti_around
-- ----------------------------
DROP TABLE IF EXISTS `sti_around`;
CREATE TABLE `sti_around`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '1 = active,\r\n2 = inactive',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sti_around
-- ----------------------------
INSERT INTO `sti_around` VALUES (1, '01', 'รอบเช้า', '1');
INSERT INTO `sti_around` VALUES (2, '02', 'รอบบ่าย', '1');

-- ----------------------------
-- Table structure for sti_ticket_transaction
-- ----------------------------
DROP TABLE IF EXISTS `sti_ticket_transaction`;
CREATE TABLE `sti_ticket_transaction`  (
  `id` int(11) NOT NULL,
  `ticket_number` int(11) NULL DEFAULT NULL,
  `ticket_price` int(10) NULL DEFAULT NULL,
  `ticket_expire` int(255) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 0,
  `stage` int(11) NOT NULL DEFAULT 0,
  `date_match` datetime NULL DEFAULT NULL,
  `date_buy` datetime NULL DEFAULT NULL,
  `code_buy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `code_scan_door1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `code_scan_door2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sti_ticket_type
-- ----------------------------
DROP TABLE IF EXISTS `sti_ticket_type`;
CREATE TABLE `sti_ticket_type`  (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` int(2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sti_ticket_type
-- ----------------------------
INSERT INTO `sti_ticket_type` VALUES (1, '01', 'ธรรมดา', '0700', 1);
INSERT INTO `sti_ticket_type` VALUES (2, '02', 'vip', '0000', 1);

SET FOREIGN_KEY_CHECKS = 1;
