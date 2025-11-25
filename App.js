import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Linking,
  Alert,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [activeMenuFilter, setActiveMenuFilter] = useState('all'); // all, food, drinks, alcohol, desserts

    const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Функция для рендеринга категорий меню
  const renderMenuCategory = (title, dishes, categoryKey) => (
    <View style={styles.menuCategory}>
      <TouchableOpacity 
        onPress={() => toggleCategory(categoryKey)}
        style={styles.categoryTouchable}
      >
        <LinearGradient
          colors={getCategoryColors(categoryKey)}
          style={styles.categoryHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.categoryHeaderContent}>
            <Text style={styles.categoryTitle}>{title}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{dishes.length}</Text>
            </View>
          </View>
          <View style={styles.expandIconContainer}>
            <Text style={styles.expandIcon}>
              {expandedCategories[categoryKey] ? '▲' : '▼'}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      
      {expandedCategories[categoryKey] && (
        <View style={styles.dishesContainer}>
          {dishes.map((dish, index) => (
            <View style={styles.dishCard} key={index}>
              <View style={styles.dishHeader}>
                <Text style={styles.dishName}>{dish.name}</Text>
                <View style={styles.dishPriceBadge}>
                  <Text style={styles.dishPrice}>{dish.price}</Text>
                </View>
              </View>
              {dish.ingredients ? (
                <Text style={styles.dishIngredients}>{dish.ingredients}</Text>
              ) : null}
              <View style={styles.dishFooter}>
                <View style={styles.dishWeightContainer}>
                  <Text style={styles.dishWeightIcon}>⚖️</Text>
                  <Text style={styles.dishWeight}>{dish.weight}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  // Функция для получения цветов градиента по категории
  const getCategoryColors = (category) => {
    const colors = {
      coldAppetizers: ['#06b6d4', '#0891b2', '#0e7490'],
      hotAppetizers: ['#f97316', '#ea580c', '#c2410c'],
      soups: ['#f59e0b', '#d97706', '#b45309'],
      pastas: ['#8b5cf6', '#7c3aed', '#6d28d9'],
      hotDishes: ['#ef4444', '#dc2626', '#b91c1c'],
      salads: ['#84cc16', '#65a30d', '#4d7c0f'],
      beerSnacks: ['#fb923c', '#f97316', '#ea580c'],
      sauces: ['#6b7280', '#4b5563', '#374151'],
      juices: ['#ec4899', '#db2777', '#be185d'],
      softDrinks: ['#3b82f6', '#2563eb', '#1d4ed8'],
      coffee: ['#92400e', '#78350f', '#451a03'],
      teaCollection: ['#059669', '#047857', '#065f46'],
      nonAlcoholicCocktails: ['#22d3ee', '#06b6d4', '#0891b2'],
      vermouths: ['#d946ef', '#c026d3', '#a21caf'],
      bitters: ['#dc2626', '#b91c1c', '#991b1b'],
      cognac: ['#a16207', '#854d0e', '#713f12'],
      brandy: ['#ca8a04', '#a16207', '#854d0e'],
      tequila: ['#16a34a', '#15803d', '#166534'],
      gin: ['#0ea5e9', '#0284c7', '#0369a1'],
      liqueur: ['#c026d3', '#a21caf', '#86198f'],
      whisky: ['#a16207', '#854d0e', '#713f12'],
      rum: ['#ca8a04', '#a16207', '#854d0e'],
      vodka: ['#3b82f6', '#2563eb', '#1d4ed8'],
      wine: ['#dc2626', '#b91c1c', '#991b1b'],
      sparklingWine: ['#fde047', '#facc15', '#eab308'],
      bottledBeer: ['#f97316', '#ea580c', '#c2410c'],
      craftBeer: ['#d97706', '#b45309', '#92400e'],
      longDrink: ['#8b5cf6', '#7c3aed', '#6d28d9'],
      alcoholicCocktails: ['#ec4899', '#db2777', '#be185d'],
      classicWorld: ['#7e22ce', '#6b21a8', '#581c87'],
      shortShots: ['#dc2626', '#b91c1c', '#991b1b'],
      simpleMixes: ['#3b82f6', '#2563eb', '#1d4ed8'],
      garnishes: ['#f59e0b', '#d97706', '#b45309'],
      desserts: ['#ec4899', '#db2777', '#be185d'],
      fruits: ['#84cc16', '#65a30d', '#4d7c0f'],
      additions: ['#6b7280', '#4b5563', '#374151']
    };
    return colors[category] || ['#6b7280', '#4b5563', '#374151'];
  };

  // Группировка категорий по типам
  const foodCategories = [
    { key: 'coldAppetizers', title: '❄️ Холодные закуски', data: [
      { name: 'Овощной калейдоскоп', ingredients: '(помидоры, огурцы, перец бол, салат)', weight: '280г', price: '450 руб' },
      { name: 'Семужка слабосоленая', ingredients: '(Семга с/c, салат зел., лимон)', weight: '120г', price: '570 руб' },
      { name: 'Селедочка', ingredients: '(Сельдь, лук, зелень)', weight: '180г', price: '430 руб' },
      { name: 'Закуска из погребка', ingredients: '(Капуста кВ, огурцы сол., помидоры, перец маринованный)', weight: '260г', price: '470 руб' },
      { name: 'Маринованные грибочки', ingredients: '(грибы маринованные)', weight: '120г', price: '250 руб' },
      { name: 'Язык говяжий с хреном', ingredients: '(Язык говяжий, зелень, хрен)', weight: '130г', price: '560 руб' },
      { name: 'Мясная ассамблея', ingredients: '(карпаччо, карбонад, колбаса с/к, хрен, горчица, зелень)', weight: '300г', price: '780 руб' },
      { name: 'Сырное ассорти', ingredients: '(Пармезан, Маасдам, Чеддер, Фитаки, мед, виноград, гр. орех)', weight: '200г', price: '630 руб' },
      { name: 'Оливки', ingredients: '(Маслины)', weight: '100г', price: '200 руб' }
    ]},
    { key: 'hotAppetizers', title: '🔥 Горячие закуски', data: [
      { name: 'Жульен грибной', ingredients: '(грибы, соус, сыр)', weight: '110г', price: '380 руб' },
      { name: 'Жульен с семгой', ingredients: '(семга, соус, сыр)', weight: '100г', price: '490 руб' },
      { name: 'Креветки "До-диез"', ingredients: '(креветки, соус)', weight: '170г', price: '590 руб' },
      { name: 'Кессадилья с курицей', ingredients: '(курица, сыр, тортилья)', weight: '340г', price: '550 руб' },
      { name: 'Блинчики с мясом', ingredients: '(блинчики, мясной фарш, соус)', weight: '120г', price: '320 руб' }
    ]},
    { key: 'soups', title: '🍜 Супы', data: [
      { name: 'Суп-пюре грибной', ingredients: '(грибы, сливки, гренки)', weight: '300г', price: '420 руб' },
      { name: 'Бульон куриный с гренками', ingredients: '(куриный бульон, гренки, зелень)', weight: '250г', price: '350 руб' }
    ]},
    { key: 'pastas', title: '🍝 Пасты', data: [
      { name: 'Паста Карбонара', ingredients: '(паста, бекон, сыр, соус)', weight: '290г', price: '550 руб' },
      { name: 'Паста с телятиной и грибами', ingredients: '(паста, телятина, грибы, соус)', weight: '300г', price: '650 руб' }
    ]},
    { key: 'hotDishes', title: '🔥 Горячие блюда', data: [
      { name: 'Стейк семги под сливочным соусом', ingredients: '', weight: '230г', price: '890 руб' },
      { name: 'Куриное филе в корочке из сыра', ingredients: '', weight: '250г', price: '720 руб' },
      { name: 'Куриное филе запеченное с ананасами', ingredients: '', weight: '250г', price: '720 руб' },
      { name: 'Свинина запеченная с овощами', ingredients: '', weight: '340г', price: '780 руб' },
      { name: 'Телятина под сл -грибным соусом', ingredients: '(банкетное меню)', weight: '280г', price: '820 руб' }
    ]},
    { key: 'garnishes', title: '🍛 Гарниры', data: [
      { name: 'Картофель молодой с укропом', ingredients: '', weight: '150г', price: '250 руб' },
      { name: 'Картофельные дольки по-деревенски', ingredients: '', weight: '150г', price: '300 руб' },
      { name: 'Картофель жареный с грибами', ingredients: '', weight: '200г', price: '350 руб' },
      { name: 'Овощной калейдоскоп', ingredients: '', weight: '150г', price: '300 руб' }
    ]},
    { key: 'salads', title: '🥗 Салаты', data: [
      { name: 'Салат Цезарь с курицей', ingredients: '(салат, с.Цезарь, кур.филе, Пармезан)', weight: '200г', price: '580 руб' },
      { name: 'Салат Цезарь с семгой', ingredients: '(салат, с.Цезарь, семга с/с, Пармезан)', weight: '200г', price: '690 руб' },
      { name: 'Салат Цезарь с креветками', ingredients: '(салат, с.Цезарь, тигр. креветку, Пармезан)', weight: '200г', price: '690 руб' },
      { name: 'Салат Эллинский', ingredients: '(огурцы, помидоры, перец б., салат, ол.масло, сыр фета, маслины, специи)', weight: '250г', price: '550 руб' },
      { name: 'Салат «Опера»', ingredients: '(говядина, огурец св., яблоко, яйцо, горчица, майонез, салат)', weight: '250г', price: '670 руб' },
      { name: 'Теплый салат «Бифф» с телятиной', ingredients: '(помидоры, перец б., салат, ог. мар.)', weight: '230г', price: '680 руб' },
      { name: 'Теплый салат «Бифф» с курицей', ingredients: '(помидоры, перец б., салат, ог. мар.)', weight: '230г', price: '580 руб' },
      { name: 'Салат-коктейль «Вдохновение»', ingredients: '(филе кур., ананас, яйцо, сыр, гр. орех, салат зел., майонез)', weight: '250г', price: '550 руб' },
      { name: 'Салат «Квартет»', ingredients: '(каллиары, огурец, яйцо, сыр, майонез)', weight: '200г', price: '570 руб' }
    ]},
    { key: 'beerSnacks', title: '🍻 Закуски к пиву', data: [
      { name: 'Сырные палочки', ingredients: '(сыр, панировка, соус)', weight: '230г', price: '500 руб' },
      { name: 'Куриные крылышки', ingredients: '(куриные крылышки, соус)', weight: '380г', price: '550 руб' },
      { name: 'Куриные наггетсы', ingredients: '(куриное филе, панировка, соус)', weight: '200г', price: '550 руб' },
      { name: 'Гренки чесночные', ingredients: '(хлеб, чеснок, соус)', weight: '200г', price: '350 руб' },
      { name: 'Картошка фри с соусом', ingredients: '(картофель, соус)', weight: '200г', price: '400 руб' }
    ]},
    { key: 'sauces', title: '🥫 Соусы', data: [
      { name: 'Соус Кетчуп', ingredients: '(томатный соус)', weight: '1 пор.', price: '60 руб' },
      { name: 'Соус Цезарь', ingredients: '(соус Цезарь)', weight: '1 пор.', price: '60 руб' },
      { name: 'Соус Кисло-сладкий', ingredients: '(кисло-сладкий соус)', weight: '1 пор.', price: '60 руб' },
      { name: 'Соус Сырный', ingredients: '(сырный соус)', weight: '1 пор.', price: '60 руб' },
      { name: 'Хрен (Горчица)', ingredients: '(хрен или горчица)', weight: '50г', price: '50 руб' }
    ]},
  ];

  const drinksCategories = [
    { key: 'juices', title: '🧃 Соки', data: [
      { name: 'Сок апельсиновый', ingredients: '(апельсиновый сок)', weight: '250г', price: '150 руб' },
      { name: 'Сок ананасовый', ingredients: '(ананасовый сок)', weight: '250г', price: '150 руб' },
      { name: 'Сок виноградный', ingredients: '(виноградный сок)', weight: '250г', price: '150 руб' },
      { name: 'Сок вишневый', ingredients: '(вишневый сок)', weight: '250г', price: '150 руб' },
      { name: 'Сок грейпфрутовый', ingredients: '(грейпфрутовый сок)', weight: '250г', price: '150 руб' },
      { name: 'Сок персиковый', ingredients: '(персиковый сок)', weight: '250г', price: '150 руб' },
      { name: 'Сок яблочный', ingredients: '(яблочный сок)', weight: '250г', price: '150 руб' },
      { name: 'Сок томатный', ingredients: '(томатный сок)', weight: '250г', price: '150 руб' },
      { name: 'Клюквенный морс', ingredients: '(клюква, вода, сахар)', weight: '250г', price: '150 руб' }
    ]},
    { key: 'softDrinks', title: '🥤 Безалкогольные напитки', data: [
      { name: 'Вода минеральная', ingredients: '(газированная или нет)', weight: '0,5л', price: '150 руб' },
      { name: 'Кока-кола', ingredients: '(газированный напиток)', weight: '0,33л', price: '190 руб' },
      { name: 'Спрайт', ingredients: '(газированный напиток)', weight: '0,25л', price: '200 руб' },
      { name: 'Швепс', ingredients: '(газированный напиток)', weight: '0,25л', price: '200 руб' },
      { name: 'Ред булл', ingredients: '(энергетический напиток)', weight: '0,25л', price: '250 руб' }
    ]},
    { key: 'coffee', title: '☕ Кофе', data: [
      { name: 'Эспрессо', ingredients: '(крепкий кофе)', weight: '10г/50мл', price: '150 руб' },
      { name: 'Двойной Эспрессо', ingredients: '(двойная порция крепкого кофе)', weight: '20г/100мл', price: '250 руб' },
      { name: 'Американо', ingredients: '(эспрессо с водой)', weight: '10г/140мл', price: '170 руб' },
      { name: 'Капучино', ingredients: '(эспрессо с молочной пенкой)', weight: '10г/120мл', price: '250 руб' },
      { name: 'Гляссе/Латте', ingredients: '(кофе с мороженым/молоком)', weight: '10г/120мл', price: '250 руб' }
    ]},
    { key: 'teaCollection', title: '🍵 Чайная коллекция', data: [
      { name: 'Чайник 400 мл', ingredients: '(любой сорт чая)', weight: '400мл', price: '150 руб' },
      { name: 'Чайник 800 мл', ingredients: '(любой сорт чая)', weight: '800мл', price: '250 руб' },
      { name: 'Черный чай "Гордость Цейлон"', ingredients: '(черный классический чай)', weight: '400мл', price: '150 руб' },
      { name: 'Черный чай с чабрецом', ingredients: '(черный чай с чабрецом)', weight: '400мл', price: '150 руб' },
      { name: 'Зеленый чай "Жасминовый №1"', ingredients: '(зеленый чай с нежным жасминовым ароматом)', weight: '400мл', price: '150 руб' },
      { name: 'Зеленый чай "Сенча"', ingredients: '(зеленый японский чай)', weight: '400мл', price: '150 руб' },
      { name: 'Фруктовый чай "Наглый фрукт"', ingredients: '(лепестки гибискуса с кусочками яблока, ананаса, шиповника и вишни)', weight: '400мл', price: '150 руб' },
      { name: 'Улун "Женьшеневый"', ingredients: '(При заваривании этого чая получается напиток со сладким вяжущим вкусом. В чай добавляется вытяжка из корня северного китайского женьшеня)', weight: '400мл', price: '150 руб' },
      { name: 'Улун "Молочный"', ingredients: '(улун с тонким сливочным ароматом)', weight: '400мл', price: '150 руб' }
    ]},
    { key: 'nonAlcoholicCocktails', title: '🍹 Безалкогольные коктейли', data: [
      { name: 'Мохито б/а', ingredients: '(Спрайт, лайм, мята)', weight: '250мл', price: '400 руб' },
      { name: 'Пина-колада б/а', ingredients: '(сок ананасовый, сироп кокосовый, сливки)', weight: '250мл', price: '350 руб' },
      { name: 'Лимонад', ingredients: '(в ассортименте)', weight: '300мл', price: '350 руб' }
    ]},
  ];

  const alcoholCategories = [
    { key: 'vermouths', title: '🍸 Vermouths/Вермуты', data: [
      { name: 'Martini Byanco/Мартини Бьянко', ingredients: '', weight: '50мл', price: '350 руб' },
      { name: 'Martini Extra Dry/Мартини Экстра Драй', ingredients: '', weight: '50мл', price: '350 руб' }
    ]},
    { key: 'bitters', title: '🥃 Bitters/Биттеры', data: [
      { name: 'Campari Bitter/Кампари Биттер', ingredients: '', weight: '50мл', price: '350 руб' },
      { name: 'Jagermeister/Ягермастер', ingredients: '', weight: '50мл', price: '450 руб' },
      { name: 'Absent Xenta/Абсент Ксента', ingredients: '', weight: '50мл', price: '400 руб' }
    ]},
    { key: 'cognac', title: '🥃 Cognag/Коньяк', data: [
      { name: 'Hennessy VSOP/Хеннесси ВСОП', ingredients: '', weight: '50мл', price: '600 руб' },
      { name: 'Hennessy VS/Хеннеси VS', ingredients: '', weight: '50мл', price: '580 руб' },
      { name: 'Remy Martin VSOP/Реми Мартин ВСОП', ingredients: '', weight: '50мл', price: '570 руб' },
      { name: 'Courvoisier VSOP/Курвуазье ВСОП', ingredients: '', weight: '50мл', price: '570 руб' },
      { name: 'Courvoisier VS/Курвуазье ВС', ingredients: '', weight: '50мл', price: '550 руб' }
    ]},
    { key: 'brandy', title: '🥃 Brandy/Бренди', data: [
      { name: 'Старейшина 7 лет', ingredients: '', weight: '50мл', price: '500 руб' },
      { name: 'Старейшина 5 лет', ingredients: '', weight: '50мл', price: '450 руб' },
      { name: 'Старейшина 3 лет', ingredients: '', weight: '50мл', price: '400 руб' }
    ]},
    { key: 'tequila', title: '🥃 Tequila/Текила', data: [
      { name: 'Olmeca clasico/Олмека белая', ingredients: '', weight: '50мл', price: '450 руб' },
      { name: 'Olmeca gold/Ольмека золотая', ingredients: '', weight: '50мл', price: '450 руб' }
    ]},
    { key: 'gin', title: '🥃 Gin/Джин', data: [
      { name: 'Gordons/Гордонс', ingredients: '', weight: '50мл', price: '370 руб' },
      { name: 'Beefeater/Бифитер', ingredients: '', weight: '50мл', price: '370 руб' }
    ]},
    { key: 'liqueur', title: '🥃 Liqueur/Ликеры', data: [
      { name: 'Blue Curacao/Блю кюрасао', ingredients: '', weight: '50мл', price: '300 руб' },
      { name: 'Baileys/Бейлис', ingredients: '', weight: '50мл', price: '350 руб' },
      { name: 'Cointreau/Куантро', ingredients: '', weight: '50мл', price: '300 руб' },
      { name: 'Kahlua/Калуа', ingredients: '', weight: '50мл', price: '300 руб' },
      { name: 'Malibu/Малибу', ingredients: '', weight: '50мл', price: '250 руб' },
      { name: 'Sambuca/Самбука', ingredients: '', weight: '50мл', price: '400 руб' }
    ]},
    { key: 'whisky', title: '🥃 Whisky/Виски', data: [
      { name: 'Jameson/Джемисон', ingredients: '', weight: '50 мл', price: '420 руб' },
      { name: 'Ballantines/Балантайнс', ingredients: '', weight: '50 мл', price: '390 руб' },
      { name: 'Jack Daniels/Джек Дэниэлс', ingredients: '', weight: '50 мл', price: '380 руб' },
      { name: 'Jim Beam/Джим Бим', ingredients: '', weight: '50 мл', price: '380 руб' },
      { name: 'William Lawsons/Вильям Лоусонс', ingredients: '', weight: '50 мл', price: '350 руб' },
      { name: 'Chivas Regal 12 years/Чивас Ригал 12 лет', ingredients: '', weight: '50 мл', price: '510 руб' },
      { name: 'Chivas Regal 18 years/Чивас Ригал 18 лет', ingredients: '', weight: '50 мл', price: '590 руб' }
    ]},
    { key: 'rum', title: '🥃 Rum/Ром', data: [
      { name: 'Bacardi белый', ingredients: '', weight: '50 мл', price: '350 руб' },
      { name: 'Bacardi черный', ingredients: '', weight: '50 мл', price: '350 руб' },
      { name: 'Captain Morgan/Капитан Морган', ingredients: '', weight: '50 мл', price: '350 руб' }
    ]},
    { key: 'vodka', title: '🥃 Vodka/Водка', data: [
      { name: 'Absolut/Абсолют', ingredients: '', weight: '50 мл', price: '350 руб' },
      { name: 'Finlandia/Финляндия', ingredients: '', weight: '50 мл', price: '350 руб' },
      { name: 'Русский Стандарт', ingredients: '', weight: '50 мл', price: '330 руб' },
      { name: 'Парламент', ingredients: '', weight: '50 мл', price: '260 руб' },
      { name: 'Хаски', ingredients: '', weight: '50 мл', price: '240 руб' },
      { name: 'Деревенька', ingredients: '', weight: '50 мл', price: '240 руб' }
    ]},
    { key: 'wine', title: '🍷 Vin/Вино', data: [
      { name: 'Кьянти красное сух', ingredients: '', weight: '150/750мл', price: '435/2175 руб' },
      { name: 'Пино Гриджио бел сух', ingredients: '', weight: '150/750мл', price: '375/1875 руб' },
      { name: 'Пино Гриджио бел п/сух', ingredients: '', weight: '150/750мл', price: '375/1875 руб' },
      { name: 'Toscana Rosso кр сух', ingredients: '', weight: '150/750мл', price: '375/1875 руб' },
      { name: 'Bardolino кр п/сух', ingredients: '', weight: '150/750мл', price: '375/1875 руб' },
      { name: 'Ламбруско кр п/сл', ingredients: '', weight: '750мл', price: '1800 руб' },
      { name: 'Ламбруско бел п/сл', ingredients: '', weight: '750мл', price: '1800 руб' }
    ]},
    { key: 'sparklingWine', title: '🥂 Игристые вина', data: [
      { name: 'Мартини Асти', ingredients: '', weight: '750мл', price: '3500 руб' },
      { name: 'Мартини Просеко', ingredients: '', weight: '750мл', price: '3500 руб' },
      { name: 'OPERA', ingredients: '', weight: '750мл', price: '2500 руб' },
      { name: 'Santa Stefano', ingredients: '', weight: '750мл', price: '1700 руб' },
      { name: 'Абрау-Дюрсо', ingredients: '', weight: '750мл', price: '1800 руб' }
    ]},
    { key: 'bottledBeer', title: '🍺 Пиво Бутылочное', data: [
      { name: 'Ловенбрау', ingredients: '', weight: '0,5л', price: '380 руб' },
      { name: 'Велкопоповицкий козел (светлое)', ingredients: '', weight: '0,5л', price: '380 руб' },
      { name: 'Велкопоповицкий Козел (темное)', ingredients: '', weight: '0,5л', price: '380 руб' },
      { name: 'Бад', ingredients: '', weight: '0,5л', price: '380 руб' },
      { name: 'Хугарден', ingredients: '', weight: '0,5л', price: '400 руб' }
    ]},
    { key: 'craftBeer', title: '🍻 Крафтовое пиво', data: [
      { name: 'Белый кролик (светлое нефильтрованное)', ingredients: '', weight: '0,5л', price: '420 руб' },
      { name: 'Вайцен бок (светлое нефильтрованное)', ingredients: '', weight: '0,5л', price: '420 руб' },
      { name: 'Два бобра (темное фильтрованное)', ingredients: '', weight: '0,5л', price: '420 руб' },
      { name: 'Два бобра (светлое фильтрованное)', ingredients: '', weight: '0,5л', price: '420 руб' }
    ]},
    { key: 'longDrink', title: '🍸 Лонг-Дринк', data: [
      { name: 'Лонг Айленд', ingredients: '(Водка, джин, ром, текила, Куантро, кола, лимонный микс)', weight: '300мл', price: '570 руб' },
      { name: 'Мега Лонг Айленд', ingredients: '(Водка, джин, ром, текила, Куантро, шампанское, сауэр микс)', weight: '300мл', price: '630 руб' },
      { name: 'Махито', ingredients: '(ром белый, спрайт, мята, лайм)', weight: '300мл', price: '450 руб' },
      { name: 'Оргазм', ingredients: '(Бейлис, Куантро, сливки)', weight: '150мл', price: '470 руб' },
      { name: 'Космополитен', ingredients: '(водка, Куантро, морс клюквенный, лимонный микс)', weight: '150мл', price: '400 руб' },
      { name: 'Двойной эффект', ingredients: '(водка, ред булл, гренадин)', weight: '300мл', price: '450 руб' },
      { name: 'Пача Сан-Пауло', ingredients: '(ром, Куантро, клубничный сироп)', weight: '250мл', price: '450 руб' },
      { name: 'Зеленая Фея', ingredients: '(текилла, абсент, водка, б. ром, Блю Курасао, персик, ликер, лимонад, ред булл)', weight: '300мл', price: '650 руб' },
      { name: 'Капитанские каникулы', ingredients: '(ром, ананасовый сок, спрайт, лайм)', weight: '300мл', price: '450 руб' }
    ]},
    { key: 'alcoholicCocktails', title: '🍹 Алкогольные коктейли', data: [
      { name: 'Голубые Гавайи', ingredients: '(Ром белый, Блю Кюрасао, кокосовый сироп, сок ананасовый)', weight: '280мл', price: '500 руб' },
      { name: 'Голубая лагуна', ingredients: '(водка, Блю Кюрасао, лимонные микс, содовая)', weight: '250мл', price: '450 руб' },
      { name: 'Дайкири', ingredients: '(ром белый, тростниковый сироп, лимонный микс)', weight: '150мл', price: '450 руб' },
      { name: 'Пина Колада', ingredients: '(Ром белый, Малибу, сок ананасовый, сироп кокосовый, сливки)', weight: '200мл', price: '550 руб' },
      { name: 'Текила-Санрайз', ingredients: '(Текила белая, сок апельсиновый, сироп гренадин)', weight: '250мл', price: '550 руб' },
      { name: 'Кровавая Мэри', ingredients: '(водка, томатный сок)', weight: '200мл', price: '400 руб' },
      { name: 'Ягерчерри', ingredients: '(ягермайстер, вишневый сок, апельсин)', weight: '250мл', price: '400 руб' },
      { name: 'Белый русский', ingredients: '(Водка, Калуа, сливки)', weight: '130мл', price: '400 руб' }
    ]},
    { key: 'alcoholicCocktail', title: '🍹 Алкогольные коктейли/Новинки', data: [
      { name: 'Голубой Космополитен', ingredients: '(Водка,Блю Кюрасао, кл. морс, сок лимона)', weight: '100мл', price: '400 руб' },
      { name: 'Розовая пантера', ingredients: '(водка, гренадин, Амаретто, клубничный сироп, сливки)', weight: '135мл', price: '450 руб' },
      { name: 'Медуза', ingredients: '(Блю кюрасао, Куантро, Абсент, Сливочный ликер)', weight: '65мл', price: '500 руб' },
      { name: 'Падающая звезда', ingredients: '(Ром белый, тоник, сок апельсиновый, лимонный сок)', weight: '160мл', price: '450 руб' },
     ]},
   
    { key: 'shortShots', title: '🥃 Короткие как выстрел', data: [
      { name: 'Б-52', ingredients: '(Калуа, Бейлис, Куантро)', weight: '60мл', price: '450 руб' },
      { name: 'Б-53', ingredients: '(Бейлис, Калуа, Абсент)', weight: '60мл', price: '470 руб' },
      { name: 'Рыжая Собака', ingredients: '(Самбука, текила)', weight: '50мл', price: '400 руб' },
      { name: 'Вкусный шот', ingredients: '(Самбука, бейлис, абсент)', weight: '50мл', price: '420 руб' },
      { name: 'Черная месса', ingredients: '(Самбука, калуа, ягермайстер)', weight: '50мл', price: '430 руб' },
      { name: 'Хиросима', ingredients: '(Самбука, Бейлис, абсент, гренадин)', weight: '60мл', price: '400 руб' }
    ]},
    { key: 'simpleMixes', title: '🥤 Простые смеси', data: [
      { name: 'Виски кола', ingredients: '(виски, кола, лимон)', weight: '200мл', price: '450 руб' },
      { name: 'Ягербулл', ingredients: '(Ягермайстер, ред булл, апельсин)', weight: '250мл', price: '450 руб' },
      { name: 'Джин слинг', ingredients: '(джин, куантро, швепс, лимон)', weight: '250мл', price: '450 руб' },
      { name: 'Куба Либре', ingredients: '(кока-кола, ром, лайм)', weight: '200мл', price: '450 руб' }
    ]},
  ];

  const dessertCategories = [
    { key: 'desserts', title: '🍰 Десерты', data: [
      { name: 'Мороженое', ingredients: '(ванильное, крем-брюле, пломбир)', weight: '100г', price: '250 руб' },
      { name: 'Наполнители для мороженого', ingredients: '(сливки, шоколад, орехи, мед, сироп)', weight: '50г', price: '50 руб' },
      { name: 'Блинчики с творогом', ingredients: '', weight: '120г', price: '250 руб' },
      { name: 'Фруктовая тарелка', ingredients: '', weight: '400г', price: '400 руб' }
    ]},
    { key: 'fruits', title: '🍎 Фрукты в ассортименте', data: [
      { name: 'Апельсины, Киви, Виноград, Яблоко, Банан', ingredients: '', weight: '100г', price: '80 руб' }
    ]},
    { key: 'additions', title: '🥖 Дополнение к основному меню', data: [
      { name: 'Хлебная корзина', ingredients: '', weight: '6 шт.', price: '50 руб' },
      { name: 'Сливки', ingredients: '', weight: '30г', price: '50 руб' },
      { name: 'Молоко', ingredients: '', weight: '50г', price: '50 руб' },
      { name: 'Лимон (лайм)', ingredients: '', weight: '50г', price: '50 руб' }
    ]},
  ];

  const renderFilteredMenu = () => {
    let categoriesToRender = [];
    
    if (activeMenuFilter === 'all') {
      return (
        <>
          <View style={styles.sectionHeader} key="section-food">
            <LinearGradient
              colors={['#f59e0b', '#dc2626']}
              style={styles.sectionHeaderGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.sectionHeaderText}>🍽️ Еда</Text>
            </LinearGradient>
          </View>
          {foodCategories.map(cat => (
            <React.Fragment key={cat.key}>
              {renderMenuCategory(cat.title, cat.data, cat.key)}
            </React.Fragment>
          ))}
          
          <View style={styles.sectionHeader} key="section-drinks">
            <LinearGradient
              colors={['#06b6d4', '#3b82f6']}
              style={styles.sectionHeaderGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.sectionHeaderText}>🥤 Безалкогольные напитки</Text>
            </LinearGradient>
          </View>
          {drinksCategories.map(cat => (
            <React.Fragment key={cat.key}>
              {renderMenuCategory(cat.title, cat.data, cat.key)}
            </React.Fragment>
          ))}
          
          <View style={styles.sectionHeader} key="section-alcohol">
            <LinearGradient
              colors={['#dc2626', '#7c3aed']}
              style={styles.sectionHeaderGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.sectionHeaderText}>🍸 Алкоголь</Text>
            </LinearGradient>
          </View>
          {alcoholCategories.map(cat => (
            <React.Fragment key={cat.key}>
              {renderMenuCategory(cat.title, cat.data, cat.key)}
            </React.Fragment>
          ))}
          
          <View style={styles.sectionHeader} key="section-desserts">
            <LinearGradient
              colors={['#ec4899', '#a855f7']}
              style={styles.sectionHeaderGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.sectionHeaderText}>🍰 Десерты и дополнения</Text>
            </LinearGradient>
          </View>
          {dessertCategories.map(cat => (
            <React.Fragment key={cat.key}>
              {renderMenuCategory(cat.title, cat.data, cat.key)}
            </React.Fragment>
          ))}
        </>
      );
    } else if (activeMenuFilter === 'food') {
      categoriesToRender = foodCategories;
    } else if (activeMenuFilter === 'drinks') {
      categoriesToRender = drinksCategories;
    } else if (activeMenuFilter === 'alcohol') {
      categoriesToRender = alcoholCategories;
    } else if (activeMenuFilter === 'desserts') {
      categoriesToRender = dessertCategories;
    }

    return categoriesToRender.map(cat => (
      <React.Fragment key={cat.key}>
        {renderMenuCategory(cat.title, cat.data, cat.key)}
      </React.Fragment>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#581c87', '#991b1b', '#000000']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={['rgba(236, 72, 153, 0.3)', 'rgba(147, 51, 234, 0.3)']}
            style={styles.headerGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.title}>🎤 Караоке ОПЕРА</Text>
            <Text style={styles.subtitle}>Лучшее караоке в городе</Text>
          </LinearGradient>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            activeTab === 'contacts' && styles.contentContainerCentered
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* HOME TAB */}
          {activeTab === 'home' && (
            <View>
              {/* Welcome Card */}
              <LinearGradient
                colors={['#dc2626', '#9333ea', '#581c87']}
                style={styles.welcomeCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.welcomeCardInner}>
                  <Text style={styles.welcomeTitle}>Добро пожаловать!</Text>
                  <Text style={styles.welcomeText}>
                    Окунитесь в мир музыки и веселья
                  </Text>
                  <View style={styles.musicIcons}>
                    <Text style={styles.musicIcon}>🎵</Text>
                    <Text style={styles.musicIcon}>🎶</Text>
                    <Text style={styles.musicIcon}>🎵</Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Schedule */}
              <View style={styles.scheduleCard}>
                <LinearGradient
                  colors={['rgba(168, 85, 247, 0.2)', 'rgba(236, 72, 153, 0.2)']}
                  style={styles.scheduleCardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.icon}>⏰</Text>
                    <Text style={styles.cardTitle}>Расписание работы</Text>
                  </View>
                  
                  <View style={styles.scheduleBlock}>
                    <View style={styles.daysContainer}>
                      <View style={styles.dayBadge}>
                        <Text style={styles.dayBadgeText}>СР</Text>
                      </View>
                      <View style={styles.dayBadge}>
                        <Text style={styles.dayBadgeText}>ЧТ</Text>
                      </View>
                      <View style={styles.dayBadge}>
                        <Text style={styles.dayBadgeText}>ВС</Text>
                      </View>
                    </View>
                    <View style={styles.timeBlock}>
                      <Text style={styles.scheduleTime}>20:00 - 02:00</Text>
                    </View>
                  </View>

                  <View style={styles.scheduleBlockHighlight}>
                    <View style={styles.daysContainer}>
                      <View style={styles.dayBadgeHighlight}>
                        <Text style={styles.dayBadgeTextHighlight}>ПТ</Text>
                      </View>
                      <View style={styles.dayBadgeHighlight}>
                        <Text style={styles.dayBadgeTextHighlight}>СБ</Text>
                      </View>
                    </View>
                    <View style={styles.timeBlock}>
                      <Text style={styles.scheduleTimeHighlight}>20:00 - 06:00</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>

              {/* 🔥 НОВЫЙ БЛОК: ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ */}
    <View style={styles.infoCard}>
      <LinearGradient
        colors={['rgba(16, 185, 129, 0.2)', 'rgba(245, 158, 11, 0.2)']}
        style={styles.infoCardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.icon}>💎</Text>
          <Text style={styles.cardTitle}>Дополнительная информация</Text>
        </View>
        
        {/* Депозит */}
        <View style={styles.infoBlock}>
          <View style={styles.infoHeader}>
            <View style={styles.daysContainer}>
              <View style={styles.dayBadgeInfo}>
                <Text style={styles.dayBadgeTextInfo}>СР</Text>
              </View>
              <View style={styles.dayBadgeInfo}>
                <Text style={styles.dayBadgeTextInfo}>ЧТ</Text>
              </View>
              <View style={styles.dayBadgeInfo}>
                <Text style={styles.dayBadgeTextInfo}>ПТ</Text>
              </View>
              <View style={styles.dayBadgeInfo}>
                <Text style={styles.dayBadgeTextInfo}>СБ</Text>
              </View>
              <View style={styles.dayBadgeInfo}>
                <Text style={styles.dayBadgeTextInfo}>ВС</Text>
              </View>
            </View>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Депозит:</Text>
            <Text style={styles.infoValue}>1000 руб с человека</Text>
          </View>
        </View>

        {/* Входной сбор */}
        <View style={styles.infoBlockHighlight}>
          <View style={styles.infoHeader}>
            <View style={styles.daysContainer}>
              <View style={styles.dayBadgeHighlight}>
                <Text style={styles.dayBadgeTextHighlight}>ПТ</Text>
              </View>
              <View style={styles.dayBadgeHighlight}>
                <Text style={styles.dayBadgeTextHighlight}>СБ</Text>
              </View>
            </View>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabelHighlight}>Входной сбор:</Text>
            <Text style={styles.infoValueHighlight}>500 руб с человека</Text>
          </View>
        </View>

        <View style={styles.infoNote}>
          <Text style={styles.infoNoteText}>
            💡 Депозит учитывается при окончательном расчете
          </Text>
        </View>
      </LinearGradient>
    </View>
 

            </View>
          )}

          {/* MENU TAB - FOOD & DRINKS */}
          {activeTab === 'menu' && (
            <View>
              {/* Menu Filter Buttons */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.filterScrollView}
                contentContainerStyle={styles.filterContainer}
              >
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    activeMenuFilter === 'all' && styles.filterButtonActive
                  ]}
                  onPress={() => setActiveMenuFilter('all')}
                >
                  <LinearGradient
                    colors={activeMenuFilter === 'all' 
                      ? ['#a855f7', '#ec4899'] 
                      : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                    style={styles.filterButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={[
                      styles.filterButtonText,
                      activeMenuFilter === 'all' && styles.filterButtonTextActive
                    ]}>
                      🎯 Всё меню
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    activeMenuFilter === 'food' && styles.filterButtonActive
                  ]}
                  onPress={() => setActiveMenuFilter('food')}
                >
                  <LinearGradient
                    colors={activeMenuFilter === 'food' 
                      ? ['#f59e0b', '#dc2626'] 
                      : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                    style={styles.filterButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={[
                      styles.filterButtonText,
                      activeMenuFilter === 'food' && styles.filterButtonTextActive
                    ]}>
                      🍽️ Еда
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    activeMenuFilter === 'drinks' && styles.filterButtonActive
                  ]}
                  onPress={() => setActiveMenuFilter('drinks')}
                >
                  <LinearGradient
                    colors={activeMenuFilter === 'drinks' 
                      ? ['#06b6d4', '#3b82f6'] 
                      : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                    style={styles.filterButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={[
                      styles.filterButtonText,
                      activeMenuFilter === 'drinks' && styles.filterButtonTextActive
                    ]}>
                      🥤 Безалкогольные
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    activeMenuFilter === 'alcohol' && styles.filterButtonActive
                  ]}
                  onPress={() => setActiveMenuFilter('alcohol')}
                >
                  <LinearGradient
                    colors={activeMenuFilter === 'alcohol' 
                      ? ['#dc2626', '#7c3aed'] 
                      : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                    style={styles.filterButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={[
                      styles.filterButtonText,
                      activeMenuFilter === 'alcohol' && styles.filterButtonTextActive
                    ]}>
                      🍸 Алкоголь
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    activeMenuFilter === 'desserts' && styles.filterButtonActive
                  ]}
                  onPress={() => setActiveMenuFilter('desserts')}
                >
                  <LinearGradient
                    colors={activeMenuFilter === 'desserts' 
                      ? ['#ec4899', '#a855f7'] 
                      : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                    style={styles.filterButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={[
                      styles.filterButtonText,
                      activeMenuFilter === 'desserts' && styles.filterButtonTextActive
                    ]}>
                      🍰 Десерты
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </ScrollView>

              {/* Menu Categories */}
              {renderFilteredMenu()}
            </View>
          )}

          {/* PRICES TAB */}
          {activeTab === 'prices' && (
            <View>
              <View style={styles.priceCard}>
                <LinearGradient
                  colors={['#ec4899', '#9333ea', '#7c3aed']}
                  style={styles.priceHeader}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.priceHeaderIcon}>💰</Text>
                  <Text style={styles.priceHeaderText}>Исполнение</Text>
                </LinearGradient>

                <View style={styles.priceList}>
                  <View style={styles.priceItem}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🎵</Text>
                      <Text style={styles.priceLabel}>Поставить песню вне очереди</Text>
                    </View>
                    <Text style={styles.priceValue}>1500 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🏛️</Text>
                      <Text style={styles.priceLabel}>Аренда зала</Text>
                    </View>
                    <Text style={styles.priceValue}>70000 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>⏰</Text>
                      <Text style={styles.priceLabel}> 1 час</Text>
                    </View>
                    <Text style={styles.priceValue}>300 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🎸</Text>
                      <Text style={styles.priceLabel}>Исполнение песни после закрытия клуба</Text>
                    </View>
                    <Text style={styles.priceValue}>1000 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🍾</Text>
                      <Text style={styles.priceLabel}>Пробковый сбор</Text>
                    </View>
                    <Text style={styles.priceValue}>1000 ₽</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* REGRET TAB */}
          {activeTab === 'regret' && (
            <View>
              <View style={styles.priceCard}>
                <LinearGradient
                  colors={['#dc2626', '#9333ea', '#581c87']}
                  style={styles.priceHeader}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.priceHeaderIcon}>😔</Text>
                  <Text style={styles.priceHeaderText}>Меню сожаления</Text>
                </LinearGradient>

                <ScrollView style={styles.priceList}>
                  <View style={styles.priceItem}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🎤</Text>
                      <Text style={styles.priceLabel}>Падение микрофона</Text>
                    </View>
                    <Text style={styles.priceValue}>1500 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🍷</Text>
                      <Text style={styles.priceLabel}>Разбитый винный бокал</Text>
                    </View>
                    <Text style={styles.priceValue}>250 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🥃</Text>
                      <Text style={styles.priceLabel}>Разбитый коньячный бокал</Text>
                    </View>
                    <Text style={styles.priceValue}>250 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🍺</Text>
                      <Text style={styles.priceLabel}>Разбитый пивной бокал</Text>
                    </View>
                    <Text style={styles.priceValue}>250 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>☕</Text>
                      <Text style={styles.priceLabel}>Разбитая чайная чашка</Text>
                    </View>
                    <Text style={styles.priceValue}>200 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🍵</Text>
                      <Text style={styles.priceLabel}>Разбитое чайное блюдце</Text>
                    </View>
                    <Text style={styles.priceValue}>200 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>☕</Text>
                      <Text style={styles.priceLabel}>Разбитое кофейное блюдце</Text>
                    </View>
                    <Text style={styles.priceValue}>200 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>☕</Text>
                      <Text style={styles.priceLabel}>Разбитая кофейная чашка</Text>
                    </View>
                    <Text style={styles.priceValue}>200 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🥤</Text>
                      <Text style={styles.priceLabel}>Разбитый стакан</Text>
                    </View>
                    <Text style={styles.priceValue}>250 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🥃</Text>
                      <Text style={styles.priceLabel}>Разбитая водочная стопка</Text>
                    </View>
                    <Text style={styles.priceValue}>250 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🫖</Text>
                      <Text style={styles.priceLabel}>Разбитый чайник 400 мл</Text>
                    </View>
                    <Text style={styles.priceValue}>600 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🫖</Text>
                      <Text style={styles.priceLabel}>Разбитый чайник 800 мл</Text>
                    </View>
                    <Text style={styles.priceValue}>800 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🥤</Text>
                      <Text style={styles.priceLabel}>Разбитый графин для сока/водки</Text>
                    </View>
                    <Text style={styles.priceValue}>400 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🍽️</Text>
                      <Text style={styles.priceLabel}>Разбитая тарелка, креманка, соусник</Text>
                    </View>
                    <Text style={styles.priceValue}>350 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🥛</Text>
                      <Text style={styles.priceLabel}>Разбитый молочник, салатник</Text>
                    </View>
                    <Text style={styles.priceValue}>200 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🍽️</Text>
                      <Text style={styles.priceLabel}>Разбитая тарелка квадратная</Text>
                    </View>
                    <Text style={styles.priceValue}>500 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🍴</Text>
                      <Text style={styles.priceLabel}>Порча столового прибора</Text>
                    </View>
                    <Text style={styles.priceValue}>350 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🧂</Text>
                      <Text style={styles.priceLabel}>Порча набора для специй</Text>
                    </View>
                    <Text style={styles.priceValue}>350 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🧻</Text>
                      <Text style={styles.priceLabel}>Порча салфетки</Text>
                    </View>
                    <Text style={styles.priceValue}>500 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🎨</Text>
                      <Text style={styles.priceLabel}>Порча скатерти</Text>
                    </View>
                    <Text style={styles.priceValue}>1000 ₽</Text>
                  </View>

                  <View style={[styles.priceItem, styles.priceItemBorder]}>
                    <View style={styles.priceItemLeft}>
                      <Text style={styles.priceItemIcon}>🎟️</Text>
                      <Text style={styles.priceLabel}>Утеря номерка</Text>
                    </View>
                    <Text style={styles.priceValue}>200 ₽</Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          )}

          {/* CONTACTS TAB */}
          {activeTab === 'contacts' && (
            <View style={styles.contactsContainer}>
              <View style={styles.contactCard}>
                <LinearGradient
                  colors={['rgba(59, 130, 246, 0.2)', 'rgba(236, 72, 153, 0.2)']}
                  style={styles.contactCardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.icon}>📞</Text>
                    <Text style={styles.cardTitle}>Контакты</Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.contactItem}
                    onPress={() => {
                      Linking.openURL('tel:+79107382438');
                    }}
                  >
                    <View style={styles.contactIconContainer}>
                      <Text style={styles.contactIcon}>📱</Text>
                    </View>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactLabel}>Телефон</Text>
                      <Text style={styles.contactValue}>+7 (910) 738 24 38</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.contactItem}
                    onPress={() => {
                      const address = 'Шишкова 107б к3';
                      const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
                      Linking.openURL(url);
                    }}
                  >
                    <View style={styles.contactIconContainer}>
                      <Text style={styles.contactIcon}>📍</Text>
                    </View>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactLabel}>Адрес</Text>
                      <Text style={styles.contactValue}>Шишкова 107б к3</Text>
                      <Text style={styles.contactValueSmall}>Нажмите для открытия карты</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.contactItem}>
                    <View style={styles.contactIconContainer}>
                      <Text style={styles.contactIcon}>⏰</Text>
                    </View>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactLabel}>Режим работы</Text>
                      <Text style={styles.contactValue}>СР-ЧТ, ВС: 20:00-02:00</Text>
                      <Text style={styles.contactValue}>ПТ-СБ: 20:00-06:00</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          )}

          {/* RULES TAB */}
          {activeTab === 'rules' && (
            <View>
              <View style={styles.noticeCard}>
                <LinearGradient
                  colors={['rgba(234, 179, 8, 0.3)', 'rgba(249, 115, 22, 0.3)']}
                  style={styles.noticeCardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.noticeTitle}>⚠️ Важная информация</Text>
                  <Text style={styles.noticeText}>
                    <Text style={styles.bold}>Уважаемые гости!</Text>
                  </Text>
                  <Text style={styles.noticeText}>
                    Вашим согласием с правилами посещения клуба является ВХОД в зал Караоке
                  </Text>
                  <Text style={styles.noticePayment}>
                    Оплата производится сразу!
                  </Text>
                </LinearGradient>
              </View>

              <View style={styles.rulesCard}>
                <LinearGradient
                  colors={['rgba(16, 185, 129, 0.2)', 'rgba(6, 182, 212, 0.2)']}
                  style={styles.rulesCardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.icon}>📜</Text>
                    <Text style={styles.cardTitle}>Правила посещения</Text>
                  </View>
                  
                  <View style={styles.ruleItemContainer}>
                    <Text style={styles.ruleIcon}>✓</Text>
                    <Text style={styles.ruleItem}>Вход в караоке с 18 лет</Text>
                  </View>
                  
                  <View style={styles.ruleItemContainer}>
                    <Text style={styles.ruleIcon}>✓</Text>
                    <Text style={styles.ruleItem}>За принесенные с собой напитки пробковый сбор 1000 руб. с бутылки</Text>
                  </View>
                  
                  <View style={styles.ruleItemContainer}>
                    <Text style={styles.ruleIcon}>✓</Text>
                    <Text style={styles.ruleItem}>Курение только в специально отведенных местах</Text>
                  </View>
                  
                  <View style={styles.ruleItemContainer}>
                    <Text style={styles.ruleIcon}>✓</Text>
                    <Text style={styles.ruleItem}>Администрация оставляет за собой право отказать в обслуживании</Text>
                  </View>
                  
                  <View style={styles.ruleItemContainer}>
                    <Text style={styles.ruleIcon}>✓</Text>
                    <Text style={styles.ruleItem}>Бронирование столов по телефону</Text>
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.footerNotice}>
                <LinearGradient
                  colors={['rgba(59, 130, 246, 0.2)', 'rgba(147, 51, 234, 0.2)']}
                  style={styles.footerNoticeGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.footerIcon}>💡</Text>
                  <Text style={styles.footerText}>
                    Время работы клуба регламентируется администрацией
                  </Text>
                </LinearGradient>

              </View>
               {/* 🔒 ДОБАВЬТЕ ЭТОТ НОВЫЙ КОМПОНЕНТ */}
    <View style={styles.securityNotice}>
      <LinearGradient
        colors={['rgba(239, 68, 68, 0.2)', 'rgba(220, 38, 38, 0.2)']}
        style={styles.securityNoticeGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.securityHeader}>
          <Text style={styles.securityIcon}>🔒</Text>
          <Text style={styles.securityTitle}>Защита контента</Text>
        </View>
        <Text style={styles.securityText}>
          В целях защиты коммерческой информации создание скриншотов 
          в приложении ограничено. При попытке скриншота будет 
          показано предупреждение.
        </Text>
        <View style={styles.securityFooter}>
          <Text style={styles.securityNote}>
            📱 Защита активна на {Platform.OS === 'ios' ? 'iOS' : 'Android'}
          </Text>
        </View>
      </LinearGradient>
    </View>
    </View>
          )}
        </ScrollView>

        {/* BOTTOM NAVIGATION MENU */}
        <View style={styles.bottomNav}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.95)', 'rgba(0, 0, 0, 0.9)']}
            style={styles.bottomNavGradient}
          >
            <View style={styles.bottomNavContent}>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setActiveTab('home')}
              >
                <View style={[
                  styles.navButtonInner,
                  activeTab === 'home' && styles.navButtonActive
                ]}>
                  {activeTab === 'home' && (
                    <LinearGradient
                      colors={['#ec4899', '#9333ea']}
                      style={styles.navButtonActiveGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    />
                  )}
                  <Text style={[
                    styles.navIcon,
                    activeTab === 'home' && styles.navIconActive
                  ]}>🏠</Text>
                  <Text 
                    style={[
                      styles.navLabel,
                      activeTab === 'home' && styles.navLabelActive
                    ]}
                    numberOfLines={1}
                  >Главная</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setActiveTab('menu')}
              >
                <View style={[
                  styles.navButtonInner,
                  activeTab === 'menu' && styles.navButtonActive
                ]}>
                  {activeTab === 'menu' && (
                    <LinearGradient
                      colors={['#ec4899', '#9333ea']}
                      style={styles.navButtonActiveGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    />
                  )}
                  <Text style={[
                    styles.navIcon,
                    activeTab === 'menu' && styles.navIconActive
                  ]}>🍽️</Text>
                  <Text 
                    style={[
                      styles.navLabel,
                      activeTab === 'menu' && styles.navLabelActive
                    ]}
                    numberOfLines={1}
                  >Меню</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setActiveTab('prices')}
              >
                <View style={[
                  styles.navButtonInner,
                  activeTab === 'prices' && styles.navButtonActive
                ]}>
                  {activeTab === 'prices' && (
                    <LinearGradient
                      colors={['#ec4899', '#9333ea']}
                      style={styles.navButtonActiveGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    />
                  )}
                  <Text style={[
                    styles.navIcon,
                    activeTab === 'prices' && styles.navIconActive
                  ]}>💰</Text>
                  <Text 
                    style={[
                      styles.navLabel,
                      activeTab === 'prices' && styles.navLabelActive
                    ]}
                    numberOfLines={1}
                  >Исполнение</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setActiveTab('regret')}
              >
                <View style={[
                  styles.navButtonInner,
                  activeTab === 'regret' && styles.navButtonActive
                ]}>
                  {activeTab === 'regret' && (
                    <LinearGradient
                      colors={['#ec4899', '#9333ea']}
                      style={styles.navButtonActiveGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    />
                  )}
                  <Text style={[
                    styles.navIcon,
                    activeTab === 'regret' && styles.navIconActive
                  ]}>😔</Text>
                  <Text 
                    style={[
                      styles.navLabel,
                      activeTab === 'regret' && styles.navLabelActive
                    ]}
                    numberOfLines={1}
                  >Сожаление</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setActiveTab('contacts')}
              >
                <View style={[
                  styles.navButtonInner,
                  activeTab === 'contacts' && styles.navButtonActive
                ]}>
                  {activeTab === 'contacts' && (
                    <LinearGradient
                      colors={['#ec4899', '#9333ea']}
                      style={styles.navButtonActiveGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    />
                  )}
                  <Text style={[
                    styles.navIcon,
                    activeTab === 'contacts' && styles.navIconActive
                  ]}>📞</Text>
                  <Text 
                    style={[
                      styles.navLabel,
                      activeTab === 'contacts' && styles.navLabelActive
                    ]}
                    numberOfLines={1}
                  >Контакты</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setActiveTab('rules')}
              >
                <View style={[
                  styles.navButtonInner,
                  activeTab === 'rules' && styles.navButtonActive
                ]}>
                  {activeTab === 'rules' && (
                    <LinearGradient
                      colors={['#ec4899', '#9333ea']}
                      style={styles.navButtonActiveGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    />
                  )}
                  <Text style={[
                    styles.navIcon,
                    activeTab === 'rules' && styles.navIconActive
                  ]}>ℹ️</Text>
                  <Text 
                    style={[
                      styles.navLabel,
                      activeTab === 'rules' && styles.navLabelActive
                    ]}
                    numberOfLines={1}
                  >Правила</Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 0,
    paddingHorizontal: 0,
    width: '100%',
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(236, 72, 153, 0.5)',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#fce7f3',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 120,
  },
  contentContainerCentered: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  welcomeCard: {
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  welcomeCardInner: {
    padding: 36,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  welcomeText: {
    fontSize: 18,
    color: '#fce7f3',
    marginBottom: 28,
    textAlign: 'center',
    lineHeight: 26,
  },
  musicIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  musicIcon: {
    fontSize: 48,
  },
  scheduleCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 24,
    shadowColor: '#a855f7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scheduleCardGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.3)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  icon: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scheduleBlock: {
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#a855f7',
  },
  scheduleBlockHighlight: {
    backgroundColor: 'rgba(236, 72, 153, 0.15)',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ec4899',
  },
  daysContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  dayBadge: {
    backgroundColor: 'rgba(168, 85, 247, 0.4)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#a855f7',
  },
  dayBadgeText: {
    color: '#e9d5ff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  dayBadgeHighlight: {
    backgroundColor: 'rgba(236, 72, 153, 0.4)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#ec4899',
  },
  dayBadgeTextHighlight: {
    color: '#fce7f3',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  timeBlock: {
    alignItems: 'flex-start',
  },
  scheduleTime: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d8b4fe',
  },
  scheduleTimeHighlight: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f9a8d4',
  },
  
  // MENU FILTER STYLES
  filterScrollView: {
    marginBottom: 20,
  },
  filterContainer: {
    paddingHorizontal: 4,
    gap: 12,
  },
  filterButton: {
    marginRight: 8,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  filterButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterButtonActive: {
    shadowColor: '#ec4899',
    shadowOpacity: 0.4,
  },
  filterButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#d1d5db',
    letterSpacing: 0.3,
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  // SECTION HEADER
  sectionHeader: {
    marginTop: 24,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  sectionHeaderGradient: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sectionHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  
  // MENU CATEGORY STYLES
  menuCategory: {
    marginBottom: 16,
  },
  categoryTouchable: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  categoryHeader: {
    padding: 18,
    borderRadius: 16,
  },
  categoryHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 36,
    alignItems: 'center',
  },
  categoryBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  expandIconContainer: {
    alignItems: 'flex-end',
  },
  expandIcon: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  
  // DISHES CONTAINER
  dishesContainer: {
    marginTop: 8,
    gap: 8,
  },
  dishCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 12,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    lineHeight: 24,
  },
  dishPriceBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  dishPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#6ee7b7',
    letterSpacing: 0.3,
  },
  dishIngredients: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginBottom: 14,
    lineHeight: 20,
  },
  dishFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dishWeightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  dishWeightIcon: {
    fontSize: 14,
  },
  dishWeight: {
    fontSize: 15,
    color: '#d1d5db',
    fontWeight: '600',
  },
  
  // PRICE CARD
  priceCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.3)',
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  priceHeader: {
    padding: 24,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  priceHeaderIcon: {
    fontSize: 32,
  },
  priceHeaderText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  priceList: {
    padding: 4,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  priceItemBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  priceItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  priceItemIcon: {
    fontSize: 20,
  },
  priceLabel: {
    fontSize: 15,
    color: '#e5e7eb',
    flex: 1,
    lineHeight: 20,
  },
  priceValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#f9a8d4',
    letterSpacing: 0.3,
  },
  
  // CONTACT CARD
  contactsContainer: {
    justifyContent: 'center',
  },
  contactCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  contactCardGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 16,
  },
  contactIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
  contactIcon: {
    fontSize: 22,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: '#93c5fd',
    marginBottom: 6,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  contactValue: {
    fontSize: 17,
    color: '#e5e7eb',
    lineHeight: 24,
    fontWeight: '500',
  },
  contactValueSmall: {
    fontSize: 13,
    color: '#93c5fd',
    marginTop: 4,
    fontStyle: 'italic',
  },
  
  // NOTICE CARD
  noticeCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  noticeCardGradient: {
    padding: 24,
    borderWidth: 2,
    borderColor: 'rgba(234, 179, 8, 0.4)',
  },
  noticeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fde047',
    marginBottom: 16,
  },
  noticeText: {
    fontSize: 17,
    color: '#fef3c7',
    marginBottom: 10,
    lineHeight: 26,
  },
  bold: {
    fontWeight: 'bold',
  },
  noticePayment: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fde047',
    marginTop: 12,
    textAlign: 'center',
  },
  
  // RULES CARD
  rulesCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  rulesCardGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  ruleItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  ruleIcon: {
    fontSize: 20,
    color: '#6ee7b7',
    marginTop: 2,
  },
  ruleItem: {
    fontSize: 16,
    color: '#d1fae5',
    flex: 1,
    lineHeight: 24,
  },
  
  // FOOTER NOTICE
  footerNotice: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  footerNoticeGradient: {
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  footerIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  footerText: {
    fontSize: 17,
    color: '#e5e7eb',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
  },
  
  // BOTTOM NAVIGATION
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 8,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(236, 72, 153, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
  },
  bottomNavGradient: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  bottomNavContent: {
    flexDirection: 'row',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
  },
  navButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 16,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  navButtonActive: {
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  navButtonActiveGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navIconActive: {
    transform: [{ scale: 1.15 }],
  },
  navLabel: {
    fontSize: 11,
    color: '#9ca3af',
    fontWeight: '600',
    letterSpacing: 0.2,
    textAlign: 'center',
    flexShrink: 1,
  },
  navLabelActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // 🔒 ДОБАВЬТЕ ЭТИ НОВЫЕ СТИЛИ В КОНЕЦ:
  securityNotice: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    marginTop: 16,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  securityNoticeGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  securityIcon: {
    fontSize: 24,
  },
  securityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fca5a5',
  },
  securityText: {
    fontSize: 14,
    color: '#fecaca',
    lineHeight: 20,
    marginBottom: 12,
  },
  securityFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(239, 68, 68, 0.2)',
    paddingTop: 12,
  },
  securityNote: {
    fontSize: 12,
    color: '#fca5a5',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  // Info Card Styles
infoCard: {
  borderRadius: 24,
  overflow: 'hidden',
  marginBottom: 24,
  shadowColor: '#10b981',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
},
infoCardGradient: {
  padding: 24,
  borderWidth: 1,
  borderColor: 'rgba(16, 185, 129, 0.3)',
},
infoBlock: {
  backgroundColor: 'rgba(16, 185, 129, 0.15)',
  borderRadius: 16,
  padding: 20,
  marginBottom: 16,
  borderLeftWidth: 4,
  borderLeftColor: '#10b981',
},
infoBlockHighlight: {
  backgroundColor: 'rgba(245, 158, 11, 0.15)',
  borderRadius: 16,
  padding: 20,
  borderLeftWidth: 4,
  borderLeftColor: '#f59e0b',
},
infoHeader: {
  marginBottom: 12,
},
infoContent: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  flexWrap: 'wrap',
},
infoLabel: {
  fontSize: 16,
  fontWeight: '600',
  color: '#6ee7b7',
},
infoValue: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#d1fae5',
},
infoLabelHighlight: {
  fontSize: 16,
  fontWeight: '600',
  color: '#fcd34d',
},
infoValueHighlight: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#fef3c7',
},
dayBadgeInfo: {
  backgroundColor: 'rgba(16, 185, 129, 0.4)',
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  borderWidth: 2,
  borderColor: '#10b981',
},
dayBadgeTextInfo: {
  color: '#d1fae5',
  fontSize: 14,
  fontWeight: 'bold',
  letterSpacing: 0.5,
},
infoNote: {
  marginTop: 16,
  padding: 12,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: 12,
  borderLeftWidth: 3,
  borderLeftColor: '#f59e0b',
},
infoNoteText: {
  fontSize: 14,
  color: '#d1d5db',
  fontStyle: 'italic',
  textAlign: 'center',
},
});