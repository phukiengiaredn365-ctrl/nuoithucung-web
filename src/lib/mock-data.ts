import type { Post, Product, Story } from "./types";

const U = (id: string, w = 800, h = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const A = (seed: string) => `https://picsum.photos/seed/${seed}/80/80`;

export const MOCK_STORIES: Story[] = [
  {
    id: "corgi-millo",
    title: "Corgi Millo",
    subtitle: "Chạy công viên",
    imageUrl: U("1517849845537-4d257902454a", 720, 1280),
    author: { name: "Corgi Millo", avatarUrl: A("millo") },
  },
  {
    id: "meo-banh-bao",
    title: "Mèo Bánh Bao",
    subtitle: "Review pate mới",
    imageUrl: U("1514888286974-6c03e2ca1dba", 720, 1280),
    author: { name: "Mèo Bánh Bao", avatarUrl: A("banhbao") },
  },
  {
    id: "xiaomi-fountain",
    title: "Máy lọc nước",
    subtitle: "Xiaomi Smart Pet",
    imageUrl: U("1552053831-71594a27632d", 720, 1280),
    author: { name: "PetCare Lab", avatarUrl: A("petcarelab") },
  },
  {
    id: "iq-toy",
    title: "Đồ chơi IQ",
    subtitle: "cho cún",
    imageUrl: U("1534361960057-19889db9621e", 720, 1280),
    author: { name: "Thùy Linh", avatarUrl: A("thuylinh") },
  },
  {
    id: "sen-boss",
    title: "Sen & Boss",
    subtitle: "Daily Routine",
    imageUrl: U("1518020382113-a7e8fc38eac9", 720, 1280),
    author: { name: "Sen & Boss", avatarUrl: A("senboss") },
  },
  {
    id: "poodle-nau",
    title: "Poodle Nâu",
    subtitle: "Đi Spa",
    imageUrl: U("1583511655826-05700d52f4d9", 720, 1280),
    author: { name: "Poodle Nâu", avatarUrl: A("poodlenau") },
  },
];

export const MOCK_DEEP_READING: Post = {
  slug: "review-xiaomi-smart-pet-fountain",
  title: "Review chi tiết máy lọc nước Xiaomi Smart Pet Fountain",
  excerpt:
    "Phân tích toàn diện từ thiết kế, khả năng lọc, độ ồn đến trải nghiệm thực tế của Boss sau 30 ngày sử dụng.",
  imageUrl: U("1552053831-71594a27632d", 1200, 900),
  imageAlt: "Golden retriever uống nước từ máy lọc Xiaomi Smart Pet",
  category: "deep-reading",
  author: { name: "PetCare Team", avatarUrl: A("petcareteam") },
  date: "2024-05-20",
  displayDate: "20 Thg 5, 2024",
  featured: true,
  readMinutes: 7,
};

export const MOCK_NEWS_CARDS: Post[] = [
  {
    slug: "cap-nhat-phac-do-viem-da-2024",
    title: "Cập nhật phác đồ điều trị viêm da ở chó mèo mới nhất 2024",
    imageUrl: U("1628009368231-7bb7cfcb0def", 800, 600),
    imageAlt: "Bác sĩ kiểm tra chó Pomeranian",
    category: "tin-tuc",
    author: { name: "Bác sĩ PetCare", avatarUrl: A("vet") },
    date: "2024-05-23T12:00:00",
    displayDate: "2 giờ trước",
  },
  {
    slug: "pet-vietnam-2024",
    title: "Pet Vietnam 2024: Sự kiện lớn nhất năm một cộng đồng yêu thú cưng",
    imageUrl: U("1537151625747-768eb6cf92b2", 800, 600),
    imageAlt: "Sự kiện Pet Vietnam",
    category: "su-kien",
    author: { name: "Cộng đồng PetCare", avatarUrl: A("community") },
    date: "2024-05-22",
    displayDate: "1 ngày trước",
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    slug: "xiaomi-smart-pet-fountain",
    name: "Máy lọc nước Xiaomi Smart Pet Fountain",
    imageUrl: U("1552053831-71594a27632d", 600, 600),
    priceVnd: 1_290_000,
    affiliateUrl: "#",
    shopeeAppUrl: "shopee://product/0/0",
  },
  {
    slug: "royal-canin-indoor-2kg",
    name: "Hạt Royal Canin Indoor 2kg",
    imageUrl: U("1548199973-03cce0bbc87b", 600, 600),
    priceVnd: 550_000,
    affiliateUrl: "#",
  },
  {
    slug: "petcube-cam-360",
    name: "Camera Petcube Cam 360",
    imageUrl: U("1574144611937-0df059b5ef3e", 600, 600),
    priceVnd: 1_890_000,
    affiliateUrl: "#",
  },
  {
    slug: "nem-tron-cao-cap",
    name: "Nệm tròn cao cấp cho chó mèo",
    imageUrl: U("1587300003388-59208cc962cb", 600, 600),
    priceVnd: 350_000,
    affiliateUrl: "#",
  },
  {
    slug: "may-hut-long-da-nang",
    name: "Máy hút lông đa năng",
    imageUrl: U("1519052537078-e6302a4968d4", 600, 600),
    priceVnd: 299_000,
    affiliateUrl: "#",
  },
];

export const MOCK_MAGAZINE_POSTS: Post[] = [
  {
    slug: "5-dau-hieu-cho-bi-stress",
    title: "5 dấu hiệu chó đang bị stress mà Sen thường bỏ qua",
    imageUrl: U("1543466835-00a7907e9de1", 800, 560),
    category: "cho",
    author: { name: "PetCare Team", avatarUrl: A("petcareteam") },
    date: "2024-05-20",
    displayDate: "20 Thg 5, 2024",
  },
  {
    slug: "vi-sao-meo-uong-it-nuoc",
    title: "Vì sao mèo uống ít nước? Cách khuyến khích mèo uống nước hiệu quả",
    imageUrl: U("1583337130417-3346a1be7dee", 800, 560),
    category: "meo",
    author: { name: "Thùy Linh", avatarUrl: A("thuylinh") },
    date: "2024-05-19",
    displayDate: "19 Thg 5, 2024",
  },
  {
    slug: "so-sanh-may-loc-nuoc-pet-tech",
    title: "So sánh 5 loại máy lọc nước cho thú cưng tốt nhất 2024",
    imageUrl: U("1552053831-71594a27632d", 800, 560),
    category: "pet-tech",
    author: { name: "PetCare Team", avatarUrl: A("petcareteam") },
    date: "2024-05-18",
    displayDate: "18 Thg 5, 2024",
  },
  {
    slug: "cach-tam-kho-cho-cho",
    title: "Cách tắm khô cho chó tại nhà đúng cách, đơn giản",
    imageUrl: U("1601758228041-f3b2795255f1", 800, 560),
    category: "cham-soc",
    author: { name: "Minh Ánh", avatarUrl: A("minhanh") },
    date: "2024-05-17",
    displayDate: "17 Thg 5, 2024",
  },
  {
    slug: "top-7-hat-tot-nhat-cho-cho",
    title: "Top 7 loại hạt tốt nhất cho chó được bác sĩ thú y khuyên dùng",
    imageUrl: U("1548199973-03cce0bbc87b", 800, 560),
    category: "dinh-duong",
    author: { name: "PetCare Team", avatarUrl: A("petcareteam") },
    date: "2024-05-16",
    displayDate: "16 Thg 5, 2024",
  },
  {
    slug: "huan-luyen-meo-di-ve-sinh",
    title: "Huấn luyện mèo đi vệ sinh đúng chỗ: Hướng dẫn chi tiết từ A-Z",
    imageUrl: U("1415369629372-26f2fe60c467", 800, 560),
    category: "huan-luyen",
    author: { name: "Thùy Linh", avatarUrl: A("thuylinh") },
    date: "2024-05-15",
    displayDate: "15 Thg 5, 2024",
  },
  {
    slug: "lich-tiem-phong-cho-cho-meo-2024",
    title: "Lịch tiêm phòng cho chó mèo đầy đủ và mới nhất 2024",
    imageUrl: U("1554629947-334ff61d85dc", 800, 560),
    category: "suc-khoe",
    author: { name: "Bác sĩ PetCare", avatarUrl: A("vet") },
    date: "2024-05-14",
    displayDate: "14 Thg 5, 2024",
  },
  {
    slug: "khoanh-khac-dang-yeu-tuan-3-thang-5",
    title: "Chia sẻ khoảnh khắc đáng yêu của Boss — Tuần 3 tháng 5",
    imageUrl: U("1561037404-61cd46aa615b", 800, 560),
    category: "cong-dong",
    author: { name: "Cộng đồng PetCare", avatarUrl: A("community") },
    date: "2024-05-13",
    displayDate: "13 Thg 5, 2024",
  },
];
