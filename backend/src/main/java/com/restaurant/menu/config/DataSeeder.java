package com.restaurant.menu.config;

import com.restaurant.menu.entity.Admin;
import com.restaurant.menu.entity.Category;
import com.restaurant.menu.entity.Product;
import com.restaurant.menu.entity.RestaurantSettings;
import com.restaurant.menu.repository.AdminRepository;
import com.restaurant.menu.repository.CategoryRepository;
import com.restaurant.menu.repository.ProductRepository;
import com.restaurant.menu.repository.RestaurantSettingsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final AdminRepository adminRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final RestaurantSettingsRepository settingsRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(
            AdminRepository adminRepository,
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            RestaurantSettingsRepository settingsRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.adminRepository = adminRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.settingsRepository = settingsRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        ensureAdmin(
                "Jlaa",
                "jlaa.amarajlaa@gmail.com",
                "Jlaa1357"
        );
        ensureInstagram("jlaa_amara");

        if (adminRepository.existsByEmail("admin@maison.com") || categoryRepository.count() > 0) {
            log.info("Database already seeded — skipping menu seed");
            return;
        }

        seedAdmin();
        seedSettings();
        seedCategoriesAndProducts();
        log.info("Seeded admin, settings, 6 categories, and 36 products");
    }

    private void ensureAdmin(String name, String email, String rawPassword) {
        String normalized = email.trim().toLowerCase();
        Admin admin = adminRepository.findByEmail(normalized).orElseGet(Admin::new);
        admin.setName(name);
        admin.setEmail(normalized);
        admin.setPasswordHash(passwordEncoder.encode(rawPassword));
        adminRepository.save(admin);
        log.info("Admin ready: {}", normalized);
    }

    private void ensureInstagram(String handle) {
        RestaurantSettings settings = settingsRepository.findAll().stream().findFirst().orElse(null);
        if (settings == null) {
            return;
        }
        settings.setInstagram(handle);
        settingsRepository.save(settings);
        log.info("Instagram set to: {}", handle);
    }

    private void seedAdmin() {
        if (adminRepository.existsByEmail("admin@maison.com")) {
            return;
        }
        Admin admin = new Admin();
        admin.setName("مدير النظام");
        admin.setEmail("admin@maison.com");
        admin.setPasswordHash(passwordEncoder.encode("admin123"));
        adminRepository.save(admin);
    }

    private void seedSettings() {
        RestaurantSettings settings = new RestaurantSettings();
        settings.setRestaurantNameAr("ميزون أوليڤيا");
        settings.setRestaurantNameEn("Maison Olivéa");
        settings.setTaglineAr("مطبخ متوسطي أنيق بنفحات زيت الزيتون");
        settings.setTaglineEn("Elegant Mediterranean cuisine with olive-oil soul");
        settings.setIsOpen(true);
        settings.setOpenHoursAr("الأحد–الخميس 12:00–23:00 | الجمعة–السبت 12:00–00:00");
        settings.setOpenHoursEn("Sun–Thu 12:00–23:00 | Fri–Sat 12:00–00:00");
        settings.setAddressAr("شارع الروتشيلد 48، تل أبيب");
        settings.setAddressEn("48 Rothschild Blvd, Tel Aviv");
        settings.setPhone("+972-3-555-0148");
        settings.setWhatsapp("+972501234567");
        settings.setInstagram("jlaa_amara");
        settings.setGoogleMapsUrl("https://maps.google.com/?q=Rothschild+Blvd+Tel+Aviv");
        settings.setLogoUrl(null);
        settingsRepository.save(settings);
    }

    private void seedCategoriesAndProducts() {
        Category meats = saveCategory("لحوم", "Meats",
                "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80", 1);
        Category seafood = saveCategory("أسماك", "Seafood",
                "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80", 2);
        Category salads = saveCategory("سلطات", "Salads",
                "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", 3);
        Category bakery = saveCategory("مخبوزات", "Bakery",
                "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80", 4);
        Category drinks = saveCategory("مشروبات غازية", "Soft Drinks",
                "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80", 5);
        Category desserts = saveCategory("تحلاي", "Desserts",
                "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80", 6);

        // --- Meats ---
        saveProduct(meats,
                "ريب آي ستيك", "Ribeye Steak",
                "ستيك ريب آي مشوي على الفحم، يقدم مع خضار مشوية وصوص الفلفل.",
                "Charcoal-grilled ribeye steak served with roasted vegetables and pepper sauce.",
                89,
                "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
                "POPULAR",
                "لحم بقري، خضار موسمية، صوص فلفل، زيت زيتون",
                "Beef, seasonal vegetables, pepper sauce, olive oil",
                "لا يوجد",
                "None");
        saveProduct(meats,
                "فيليه بقري", "Beef Fillet",
                "قطعة فيليه طرية مشوية حسب درجة الاستواء المطلوبة، تقدم مع بطاطا مهروسة.",
                "Tender beef fillet grilled to your preferred doneness, served with mashed potatoes.",
                105,
                "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
                "CHEF",
                "فيليه بقري، بطاطا، زبدة، أعشاب طازجة",
                "Beef fillet, potato, butter, fresh herbs",
                "حليب",
                "Milk");
        saveProduct(meats,
                "ريش غنم", "Lamb Chops",
                "ريش غنم مشوية ومتبلّة بإكليل الجبل والثوم والبهارات المتوسطية.",
                "Grilled lamb chops marinated with rosemary, garlic, and Mediterranean spices.",
                98,
                "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80",
                null,
                "ريش غنم، إكليل الجبل، ثوم، بهارات",
                "Lamb chops, rosemary, garlic, spices",
                null, null);
        saveProduct(meats,
                "برغر بقري", "Beef Burger",
                "برغر لحم بقري 200 غرام مع خس، بندورة، بصل مكرمل وصوص المطعم.",
                "200g beef burger with lettuce, tomato, caramelized onion, and house sauce.",
                64,
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
                "POPULAR",
                "لحم بقري، خبز برغر، خس، بندورة، بصل، صوص خاص",
                "Beef, burger bun, lettuce, tomato, onion, house sauce",
                "غلوتين، سمسم",
                "Gluten, sesame");
        saveProduct(meats,
                "مشاوي مشكلة", "Mixed Grill",
                "تشكيلة لحوم ودجاج مشوية تقدم مع خضار وصوصات متنوعة.",
                "Assorted grilled meats and chicken served with vegetables and assorted sauces.",
                110,
                "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80",
                null, null, null, null, null);
        saveProduct(meats,
                "أضلاع بقر مطهوة ببطء", "Slow-Cooked Beef Ribs",
                "أضلاع بقر مطهوة ببطء مع صوص باربكيو وتقدم مع بطاطا كريمية.",
                "Slow-cooked beef ribs with barbecue sauce, served with creamy potatoes.",
                96,
                "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
                "NEW",
                "أضلاع بقر، صوص باربكيو، بطاطا، كريمة",
                "Beef ribs, barbecue sauce, potato, cream",
                "حليب",
                "Milk");

        // --- Seafood ---
        saveProduct(seafood,
                "سلمون مشوي", "Grilled Salmon",
                "فيليه سلمون طازج مشوي مع الليمون والأعشاب والخضار.",
                "Fresh grilled salmon fillet with lemon, herbs, and vegetables.",
                82,
                "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
                "POPULAR",
                "سلمون، ليمون، أعشاب، خضار موسمية",
                "Salmon, lemon, herbs, seasonal vegetables",
                "سمك",
                "Fish");
        saveProduct(seafood,
                "قاروص مشوي", "Grilled Sea Bass",
                "سمك قاروص مشوي مع زيت الزيتون والليمون والثوم والبطاطا.",
                "Grilled sea bass with olive oil, lemon, garlic, and potatoes.",
                87,
                "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
                "CHEF",
                "قاروص، زيت زيتون، ليمون، ثوم، بطاطا",
                "Sea bass, olive oil, lemon, garlic, potato",
                "سمك",
                "Fish");
        saveProduct(seafood,
                "كالاماري مقلي", "Fried Calamari",
                "كالاماري مقرمش يقدم مع الليمون وصوص الثوم.",
                "Crispy calamari served with lemon and garlic sauce.",
                58,
                "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
                null,
                "كالاماري، دقيق، ليمون، ثوم",
                "Calamari, flour, lemon, garlic",
                "رخويات، غلوتين",
                "Molluscs, gluten");
        saveProduct(seafood,
                "دنيس مشوي", "Grilled Sea Bream",
                "سمك دنيس على الطريقة المتوسطية مع الأعشاب والليمون.",
                "Mediterranean-style grilled sea bream with herbs and lemon.",
                85,
                "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
                null, null, null, "سمك", "Fish");
        saveProduct(seafood,
                "فيش آند تشيبس", "Fish and Chips",
                "سمك مقرمش يقدم مع البطاطا المقلية وصوص التارتار.",
                "Crispy battered fish served with fries and tartar sauce.",
                62,
                "https://images.unsplash.com/photo-1579208030886-b937da0925dc?auto=format&fit=crop&w=800&q=80",
                null,
                "سمك أبيض، دقيق، بطاطا، صوص تارتار",
                "White fish, flour, potato, tartar sauce",
                "سمك، غلوتين، بيض",
                "Fish, gluten, egg");
        saveProduct(seafood,
                "روبيان بالثوم", "Garlic Prawns",
                "روبيان مطهو مع الثوم وزيت الزيتون والفلفل والبقدونس.",
                "Prawns cooked with garlic, olive oil, chili, and parsley.",
                74,
                "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
                "SPICY",
                "روبيان، ثوم، زيت زيتون، فلفل حار، بقدونس",
                "Prawns, garlic, olive oil, chili, parsley",
                "قشريات",
                "Crustaceans");

        // --- Salads ---
        saveProduct(salads,
                "سلطة سيزر", "Caesar Salad",
                "خس روماني مع جبنة بارميزان، كروتون وصوص سيزر.",
                "Romaine lettuce with Parmesan, croutons, and Caesar dressing.",
                44,
                "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80",
                "POPULAR",
                "خس روماني، بارميزان، كروتون، صوص سيزر",
                "Romaine lettuce, Parmesan, croutons, Caesar dressing",
                "حليب، غلوتين، بيض، سمك",
                "Milk, gluten, egg, fish");
        saveProduct(salads,
                "سلطة يونانية", "Greek Salad",
                "بندورة، خيار، بصل أحمر، زيتون وجبنة فيتا.",
                "Tomato, cucumber, red onion, olives, and feta cheese.",
                42,
                "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
                "VEGETARIAN",
                "بندورة، خيار، بصل، زيتون، فيتا، زيت زيتون",
                "Tomato, cucumber, onion, olives, feta, olive oil",
                "حليب",
                "Milk");
        saveProduct(salads,
                "سلطة حلوم", "Halloumi Salad",
                "خضار طازجة مع جبنة حلوم مشوية وصوص بلسميك.",
                "Fresh vegetables with grilled halloumi and balsamic dressing.",
                49,
                "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80",
                "VEGETARIAN",
                "حلوم، خضار طازجة، بلسميك",
                "Halloumi, fresh vegetables, balsamic",
                "حليب",
                "Milk");
        saveProduct(salads,
                "سلطة كينوا", "Quinoa Salad",
                "كينوا مع أفوكادو، بندورة كرزية، خيار وأعشاب طازجة.",
                "Quinoa with avocado, cherry tomatoes, cucumber, and fresh herbs.",
                46,
                "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
                "VEGETARIAN",
                null, null, null, null);
        saveProduct(salads,
                "سلطة دجاج", "Chicken Salad",
                "صدر دجاج مشوي مع خضار وصوص خردل.",
                "Grilled chicken breast with vegetables and mustard dressing.",
                54,
                "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
                null, null, null, "خردل", "Mustard");
        saveProduct(salads,
                "سلطة بوراتا", "Burrata Salad",
                "جبنة بوراتا كريمية مع بندورة، ريحان وزيت زيتون.",
                "Creamy burrata with tomatoes, basil, and olive oil.",
                55,
                "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80",
                "NEW",
                "بوراتا، بندورة، ريحان، زيت زيتون",
                "Burrata, tomato, basil, olive oil",
                "حليب",
                "Milk");

        // --- Bakery ---
        saveProduct(bakery,
                "خبز بالثوم", "Garlic Bread",
                "خبز طازج مخبوز مع زبدة الثوم والأعشاب.",
                "Fresh-baked bread with garlic butter and herbs.",
                24,
                "https://images.unsplash.com/photo-1573140401552-3fab574c5d37?auto=format&fit=crop&w=800&q=80",
                null,
                "خبز، زبدة، ثوم، أعشاب",
                "Bread, butter, garlic, herbs",
                "غلوتين، حليب",
                "Gluten, milk");
        saveProduct(bakery,
                "فوكاتشا", "Focaccia",
                "فوكاتشا إيطالية مع زيت زيتون وإكليل الجبل.",
                "Italian focaccia with olive oil and rosemary.",
                28,
                "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
                "VEGETARIAN",
                "دقيق، زيت زيتون، إكليل الجبل، ملح",
                "Flour, olive oil, rosemary, salt",
                "غلوتين",
                "Gluten");
        saveProduct(bakery,
                "منقوشة جبنة", "Cheese Manakish",
                "عجينة طازجة مخبوزة مع خلطة جبن غنية.",
                "Fresh dough baked with a rich cheese blend.",
                32,
                "https://images.unsplash.com/photo-1604908177522-44078be1d0c7?auto=format&fit=crop&w=800&q=80",
                "POPULAR",
                "عجينة، جبنة عكاوي، جبنة موزاريلا",
                "Dough, akkawi cheese, mozzarella",
                "غلوتين، حليب",
                "Gluten, milk");
        saveProduct(bakery,
                "منقوشة زعتر", "Zaatar Manakish",
                "عجينة طازجة مع الزعتر وزيت الزيتون.",
                "Fresh dough topped with zaatar and olive oil.",
                27,
                "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
                "VEGETARIAN",
                "عجينة، زعتر، زيت زيتون",
                "Dough, zaatar, olive oil",
                "غلوتين، سمسم",
                "Gluten, sesame");
        saveProduct(bakery,
                "كرواسون جبنة", "Cheese Croissant",
                "كرواسون زبدة محشو بالجبنة الذائبة.",
                "Buttery croissant filled with melted cheese.",
                25,
                "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
                null,
                "دقيق، زبدة، جبنة",
                "Flour, butter, cheese",
                "غلوتين، حليب",
                "Gluten, milk");
        saveProduct(bakery,
                "سلة خبز", "Bread Basket",
                "تشكيلة خبز طازج تقدم مع زيت الزيتون والغموس.",
                "Assorted fresh breads served with olive oil and dips.",
                29,
                "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
                null, null, null, "غلوتين", "Gluten");

        // --- Soft drinks ---
        saveProduct(drinks,
                "كوكا كولا", "Coca-Cola",
                "كوكا كولا كلاسيكية باردة.",
                "Classic chilled Coca-Cola.",
                14,
                "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
                null, null, null, null, null);
        saveProduct(drinks,
                "كوكا كولا زيرو", "Coca-Cola Zero",
                "كوكا كولا بدون سكر.",
                "Sugar-free Coca-Cola Zero.",
                14,
                "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=800&q=80",
                null, null, null, null, null);
        saveProduct(drinks,
                "سبرايت", "Sprite",
                "مشروب غازي بنكهة الليمون.",
                "Lemon-lime sparkling soft drink.",
                14,
                "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=80",
                null, null, null, null, null);
        saveProduct(drinks,
                "فانتا برتقال", "Fanta Orange",
                "مشروب غازي منعش بنكهة البرتقال.",
                "Refreshing orange-flavored soft drink.",
                14,
                "https://images.unsplash.com/photo-1624517452488-048e400f9a0c?auto=format&fit=crop&w=800&q=80",
                null, null, null, null, null);
        saveProduct(drinks,
                "شويبس تونيك", "Schweppes Tonic",
                "مياه تونيك غازية تقدم باردة.",
                "Chilled sparkling tonic water.",
                15,
                "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
                null, null, null, null, null);
        saveProduct(drinks,
                "مياه غازية", "Sparkling Water",
                "مياه معدنية غازية ومنعشة.",
                "Refreshing sparkling mineral water.",
                13,
                "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80",
                null, null, null, null, null);

        // --- Desserts ---
        saveProduct(desserts,
                "شوكولاتة فوندان", "Chocolate Fondant",
                "كيكة شوكولاتة ساخنة بقلب سائل، تقدم مع بوظة فانيلا.",
                "Warm chocolate cake with a molten center, served with vanilla ice cream.",
                42,
                "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80",
                "CHEF",
                "شوكولاتة داكنة، زبدة، بيض، دقيق، بوظة فانيلا",
                "Dark chocolate, butter, egg, flour, vanilla ice cream",
                "حليب، بيض، غلوتين",
                "Milk, egg, gluten");
        saveProduct(desserts,
                "تشيز كيك", "Cheesecake",
                "تشيز كيك كريمية تقدم مع صوص التوت.",
                "Creamy cheesecake served with berry sauce.",
                39,
                "https://images.unsplash.com/photo-1533134242443-d3fd45145030?auto=format&fit=crop&w=800&q=80",
                "POPULAR",
                "جبنة كريمية، بسكويت، توت",
                "Cream cheese, biscuit base, berries",
                "حليب، غلوتين",
                "Milk, gluten");
        saveProduct(desserts,
                "تيراميسو", "Tiramisu",
                "حلوى إيطالية كلاسيكية مع ماسكاربوني وقهوة وكاكاو.",
                "Classic Italian dessert with mascarpone, coffee, and cocoa.",
                40,
                "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
                null,
                "ماسكاربوني، قهوة، بسكويت سافوياردي، كاكاو",
                "Mascarpone, coffee, savoiardi, cocoa",
                "حليب، بيض، غلوتين",
                "Milk, egg, gluten");
        saveProduct(desserts,
                "كريم بروليه", "Crème Brûlée",
                "كاسترد فانيلا مغطى بطبقة سكر مكرملة.",
                "Vanilla custard topped with a caramelized sugar crust.",
                38,
                "https://images.unsplash.com/photo-1470124182917-cc6e71eef184?auto=format&fit=crop&w=800&q=80",
                null,
                "كريمة، بيض، فانيلا، سكر",
                "Cream, egg, vanilla, sugar",
                "حليب، بيض",
                "Milk, egg");
        saveProduct(desserts,
                "كيكة فستق", "Pistachio Cake",
                "كيكة فستق طرية مع كريمة فستق ومكسرات.",
                "Soft pistachio cake with pistachio cream and nuts.",
                43,
                "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
                "NEW",
                "فستق، دقيق، زبدة، كريمة",
                "Pistachio, flour, butter, cream",
                "مكسرات، حليب، غلوتين، بيض",
                "Nuts, milk, gluten, egg");
        saveProduct(desserts,
                "تشكيلة بوظة", "Ice Cream Selection",
                "3 كرات بوظة حسب اختيار الزبون.",
                "Three scoops of ice cream of your choice.",
                32,
                "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
                null,
                "حليب، سكر، نكهات متنوعة",
                "Milk, sugar, assorted flavors",
                "حليب",
                "Milk");
    }

    private Category saveCategory(String nameAr, String nameEn, String image, int sortOrder) {
        Category category = new Category();
        category.setNameAr(nameAr);
        category.setNameEn(nameEn);
        category.setImage(image);
        category.setIsVisible(true);
        category.setSortOrder(sortOrder);
        return categoryRepository.save(category);
    }

    private void saveProduct(
            Category category,
            String nameAr,
            String nameEn,
            String descriptionAr,
            String descriptionEn,
            double price,
            String image,
            String badge,
            String ingredientsAr,
            String ingredientsEn,
            String allergensAr,
            String allergensEn
    ) {
        Product product = new Product();
        product.setCategory(category);
        product.setNameAr(nameAr);
        product.setNameEn(nameEn);
        product.setDescriptionAr(descriptionAr);
        product.setDescriptionEn(descriptionEn);
        product.setPrice(BigDecimal.valueOf(price));
        product.setImage(image);
        product.setIsVisible(true);
        product.setIsAvailable(true);
        product.setBadge(badge);
        product.setIngredientsAr(ingredientsAr);
        product.setIngredientsEn(ingredientsEn);
        product.setAllergensAr(allergensAr);
        product.setAllergensEn(allergensEn);
        productRepository.save(product);
    }
}
