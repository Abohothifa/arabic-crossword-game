'use strict';
/* الكلمات المتقاطعة العربية — منطق اللعبة الكامل (بدون مكتبات، يعمل دون إنترنت) */

/* نسخة مضمّنة من بيانات الألغاز (احتياط عند فشل fetch من file://).
   تُستبدل تلقائياً بالبيانات الكاملة من levels.json أثناء البناء. */
const EMBEDDED_PUZZLES = [{"id": "b1", "difficulty": "beginner", "category": "riddles", "title": "b1", "rows": 9, "cols": 9, "grid": ["###م#####", "###ف#####", "###ت#ن###", "###ا#وهم#", "###حلم###", "####غ####", "##كنز####", "#########", "#########"], "words": [{"answer": "حلم", "clue": "ما يراه النائم في منامه", "row": 4, "col": 3, "dir": "h", "num": 4}, {"answer": "نوم", "clue": "راحة الجسم والعينين ليلا", "row": 2, "col": 5, "dir": "v", "num": 2}, {"answer": "لغز", "clue": "سؤال صعب يحتاج إلى تفكير", "row": 4, "col": 4, "dir": "v", "num": 5}, {"answer": "وهم", "clue": "ما يتصوره الإنسان وليس حقيقيا", "row": 3, "col": 5, "dir": "h", "num": 3}, {"answer": "كنز", "clue": "مال مدفون يبحث عنه الناس", "row": 6, "col": 2, "dir": "h", "num": 6}, {"answer": "مفتاح", "clue": "أداة تفتح الأبواب", "row": 0, "col": 3, "dir": "v", "num": 1}]}, {"id": "b2", "difficulty": "beginner", "category": "figures", "title": "b2", "rows": 9, "cols": 9, "grid": ["#####أيوب", "######و##", "##عثمان##", "##ل#و#س##", "##يوسف###", "####ى####", "#########", "#########", "#########"], "words": [{"answer": "يوسف", "clue": "نبي رأى أحد عشر كوكبا في المنام", "row": 4, "col": 2, "dir": "h", "num": 5}, {"answer": "علي", "clue": "رابع الخلفاء الراشدين", "row": 2, "col": 2, "dir": "v", "num": 3}, {"answer": "عثمان", "clue": "ثالث الخلفاء الراشدين", "row": 2, "col": 2, "dir": "h", "num": 3}, {"answer": "يونس", "clue": "نبي ابتلعه الحوت", "row": 0, "col": 6, "dir": "v", "num": 2}, {"answer": "موسى", "clue": "نبي كلم الله سبحانه", "row": 2, "col": 4, "dir": "v", "num": 4}, {"answer": "أيوب", "clue": "نبي اشتهر بالصبر على البلاء", "row": 0, "col": 5, "dir": "h", "num": 1}]}, {"id": "b3", "difficulty": "beginner", "category": "geography", "title": "b3", "rows": 9, "cols": 9, "grid": ["#########", "###ت#####", "##سوريا##", "###ن#####", "##مسقط###", "####ط####", "#جزيرة###", "#########", "#########"], "words": [{"answer": "مسقط", "clue": "عاصمة عمان", "row": 4, "col": 2, "dir": "h", "num": 3}, {"answer": "قطر", "clue": "دولة عربية عاصمتها الدوحة", "row": 4, "col": 4, "dir": "v", "num": 4}, {"answer": "جزيرة", "clue": "أرض تحيط بها المياه من كل الجهات", "row": 6, "col": 1, "dir": "h", "num": 5}, {"answer": "تونس", "clue": "دولة عربية عاصمتها تونس", "row": 1, "col": 3, "dir": "v", "num": 1}, {"answer": "سوريا", "clue": "دولة عربية عاصمتها دمشق", "row": 2, "col": 2, "dir": "h", "num": 2}]}, {"id": "b4", "difficulty": "beginner", "category": "language", "title": "b4", "rows": 9, "cols": 9, "grid": ["#########", "#####م###", "###ص#ب###", "###ر#ت###", "##مفرد###", "##ف##أ###", "جمع######", "##و######", "فعل######"], "words": [{"answer": "مفرد", "clue": "ما دل على واحد فقط", "row": 4, "col": 2, "dir": "h", "num": 3}, {"answer": "صرف", "clue": "علم يهتم ببنية الكلمة العربية", "row": 2, "col": 3, "dir": "v", "num": 2}, {"answer": "مفعول", "clue": "من وقع عليه الفعل", "row": 4, "col": 2, "dir": "v", "num": 3}, {"answer": "جمع", "clue": "ما دل على أكثر من اثنين", "row": 6, "col": 0, "dir": "h", "num": 4}, {"answer": "مبتدأ", "clue": "اسم يبدأ به الكلام في الجملة الاسمية", "row": 1, "col": 5, "dir": "v", "num": 1}, {"answer": "فعل", "clue": "كلمة تدل على حدث في زمن معين", "row": 8, "col": 0, "dir": "h", "num": 5}]}, {"id": "b5", "difficulty": "beginner", "category": "islamic", "title": "b5", "rows": 9, "cols": 9, "grid": ["#########", "#########", "#سجود####", "####ع####", "##صيام###", "##ح#ء####", "شوال#####", "##ب######", "#عيد#####"], "words": [{"answer": "صيام", "clue": "الامتناع عن الطعام والشراب في شهر رمضان", "row": 4, "col": 2, "dir": "h", "num": 3}, {"answer": "دعاء", "clue": "طلب من الله عز وجل", "row": 2, "col": 4, "dir": "v", "num": 2}, {"answer": "صحابي", "clue": "من لقي النبي مؤمنا به ومات على ذلك", "row": 4, "col": 2, "dir": "v", "num": 3}, {"answer": "سجود", "clue": "وضع الجبهة على الأرض في الصلاة", "row": 2, "col": 1, "dir": "h", "num": 1}, {"answer": "شوال", "clue": "الشهر الذي يأتي بعد رمضان مباشرة", "row": 6, "col": 0, "dir": "h", "num": 4}, {"answer": "عيد", "clue": "مناسبة فرح بعد شهر رمضان", "row": 8, "col": 1, "dir": "h", "num": 5}]}, {"id": "b6", "difficulty": "beginner", "category": "history", "title": "b6", "rows": 9, "cols": 9, "grid": ["#########", "#########", "#درع#####", "##و######", "##متحف###", "##ا#ص####", "###أندلس#", "#########", "#########"], "words": [{"answer": "متحف", "clue": "مكان تحفظ فيه الآثار القديمة", "row": 4, "col": 2, "dir": "h", "num": 3}, {"answer": "حصن", "clue": "بناء محصن للدفاع عن المدينة", "row": 4, "col": 4, "dir": "v", "num": 4}, {"answer": "روما", "clue": "عاصمة الإمبراطورية الرومانية القديمة", "row": 2, "col": 2, "dir": "v", "num": 2}, {"answer": "درع", "clue": "ما يلبس للحماية في الحرب", "row": 2, "col": 1, "dir": "h", "num": 1}, {"answer": "أندلس", "clue": "بلاد حكمها المسلمون في أوروبا قرونا", "row": 6, "col": 3, "dir": "h", "num": 5}]}, {"id": "m1", "difficulty": "intermediate", "category": "animals", "title": "m1", "rows": 9, "cols": 9, "grid": ["#########", "#########", "####موز##", "#####ر###", "###أسد###", "#نمر#ة###", "###ن#####", "ثعلب#####", "#########"], "words": [{"answer": "أسد", "clue": "ملك الغابة وحيوان مفترس", "row": 4, "col": 3, "dir": "h", "num": 3}, {"answer": "وردة", "clue": "زهرة جميلة ذات رائحة طيبة", "row": 2, "col": 5, "dir": "v", "num": 2}, {"answer": "موز", "clue": "فاكهة صفراء طويلة", "row": 2, "col": 4, "dir": "h", "num": 1}, {"answer": "أرنب", "clue": "حيوان صغير طويل الأذنين", "row": 4, "col": 3, "dir": "v", "num": 3}, {"answer": "ثعلب", "clue": "حيوان معروف بالمكر", "row": 7, "col": 0, "dir": "h", "num": 5}, {"answer": "نمر", "clue": "حيوان مفترس مخطط الجسم", "row": 5, "col": 1, "dir": "h", "num": 4}]}, {"id": "m2", "difficulty": "intermediate", "category": "science", "title": "m2", "rows": 9, "cols": 9, "grid": ["#########", "#########", "#########", "##ز#ج####", "##حرارة##", "##ل#ذ##م#", "####بخار#", "####ي##ي#", "#زهرة##خ#"], "words": [{"answer": "حرارة", "clue": "مقياس سخونة الأجسام", "row": 4, "col": 2, "dir": "h", "num": 3}, {"answer": "جاذبية", "clue": "قوة تجذب الأجسام نحو الأرض", "row": 3, "col": 4, "dir": "v", "num": 2}, {"answer": "بخار", "clue": "ماء يتحول إلى غاز بالحرارة", "row": 6, "col": 4, "dir": "h", "num": 5}, {"answer": "زحل", "clue": "كوكب تحيط به حلقات", "row": 3, "col": 2, "dir": "v", "num": 1}, {"answer": "مريخ", "clue": "كوكب أحمر اللون", "row": 5, "col": 7, "dir": "v", "num": 4}, {"answer": "زهرة", "clue": "كوكب قريب من الشمس", "row": 8, "col": 1, "dir": "h", "num": 6}]}, {"id": "m3", "difficulty": "intermediate", "category": "general", "title": "m3", "rows": 9, "cols": 9, "grid": ["#########", "##م######", "ج#د#ك####", "بحر#ت####", "ل#سحاب###", "##ة#ب####", "#########", "#########", "#########"], "words": [{"answer": "سحاب", "clue": "بخار ماء متجمع في السماء", "row": 4, "col": 2, "dir": "h", "num": 5}, {"answer": "كتاب", "clue": "مجموعة أوراق فيها علم أو قصة", "row": 2, "col": 4, "dir": "v", "num": 3}, {"answer": "مدرسة", "clue": "مكان يتعلم فيه التلاميذ", "row": 1, "col": 2, "dir": "v", "num": 1}, {"answer": "بحر", "clue": "مسطح مائي مالح واسع", "row": 3, "col": 0, "dir": "h", "num": 4}, {"answer": "جبل", "clue": "مرتفع كبير من الأرض", "row": 2, "col": 0, "dir": "v", "num": 2}]}, {"id": "m4", "difficulty": "intermediate", "category": "science", "title": "m4", "rows": 9, "cols": 9, "grid": ["#########", "######ع##", "######ط##", "##ش###ا##", "##مختبر##", "##س#ج#د##", "###ذرة###", "####ب####", "#خلية####"], "words": [{"answer": "مختبر", "clue": "مكان تجرى فيه التجارب العلمية", "row": 4, "col": 2, "dir": "h", "num": 3}, {"answer": "تجربة", "clue": "اختبار علمي لإثبات فكرة", "row": 4, "col": 4, "dir": "v", "num": 4}, {"answer": "شمس", "clue": "نجم يضيء النهار", "row": 3, "col": 2, "dir": "v", "num": 2}, {"answer": "عطارد", "clue": "أقرب الكواكب إلى الشمس", "row": 1, "col": 6, "dir": "v", "num": 1}, {"answer": "ذرة", "clue": "أصغر وحدة في المادة", "row": 6, "col": 3, "dir": "h", "num": 5}, {"answer": "خلية", "clue": "أصغر وحدة في جسم الكائن الحي", "row": 8, "col": 1, "dir": "h", "num": 6}]}, {"id": "m5", "difficulty": "intermediate", "category": "islamic", "title": "m5", "rows": 9, "cols": 9, "grid": ["#########", "##إ######", "#رمضان###", "##ا######", "##مسجد###", "#و#و#####", "#ض#ر#####", "توبة#####", "#ء#######"], "words": [{"answer": "مسجد", "clue": "بيت يصلي فيه المسلمون", "row": 4, "col": 2, "dir": "h", "num": 3}, {"answer": "سورة", "clue": "جزء من القرآن الكريم", "row": 4, "col": 3, "dir": "v", "num": 4}, {"answer": "توبة", "clue": "رجوع إلى الله بعد الذنب", "row": 7, "col": 0, "dir": "h", "num": 6}, {"answer": "وضوء", "clue": "طهارة بالماء قبل الصلاة", "row": 5, "col": 1, "dir": "v", "num": 5}, {"answer": "إمام", "clue": "من يؤم الناس في الصلاة", "row": 1, "col": 2, "dir": "v", "num": 1}, {"answer": "رمضان", "clue": "شهر الصيام عند المسلمين", "row": 2, "col": 1, "dir": "h", "num": 2}]}, {"id": "m6", "difficulty": "intermediate", "category": "sports", "title": "m6", "rows": 9, "cols": 9, "grid": ["#########", "#########", "##ملعب###", "#####ط###", "م#جودو###", "ر####ل###", "ملاكمة###", "ى########", "#########"], "words": [{"answer": "جودو", "clue": "رياضة قتالية يابانية الأصل", "row": 4, "col": 2, "dir": "h", "num": 4}, {"answer": "بطولة", "clue": "مسابقة كبيرة بين الفرق أو اللاعبين", "row": 2, "col": 5, "dir": "v", "num": 2}, {"answer": "ملعب", "clue": "مكان تقام فيه المباريات", "row": 2, "col": 2, "dir": "h", "num": 1}, {"answer": "ملاكمة", "clue": "رياضة قتالية تلبس فيها القفازات", "row": 6, "col": 0, "dir": "h", "num": 5}, {"answer": "مرمى", "clue": "ما يسدد اللاعب الكرة نحوه ليسجل", "row": 4, "col": 0, "dir": "v", "num": 3}]}, {"id": "a1", "difficulty": "advanced", "category": "history", "title": "a1", "rows": 9, "cols": 9, "grid": ["########ف", "#####قيصر", "#####ل##ع", "##ب##ع##و", "##غزوة##ن", "##د######", "آثار#####", "##د######", "#########"], "words": [{"answer": "غزوة", "clue": "معركة شارك فيها النبي صلى الله عليه وسلم", "row": 4, "col": 2, "dir": "h", "num": 4}, {"answer": "بغداد", "clue": "عاصمة العراق وبنيت في العصر العباسي", "row": 3, "col": 2, "dir": "v", "num": 3}, {"answer": "قلعة", "clue": "حصن قديم يبنى للدفاع عن المدينة", "row": 1, "col": 5, "dir": "v", "num": 2}, {"answer": "قيصر", "clue": "لقب ملوك الروم قديما", "row": 1, "col": 5, "dir": "h", "num": 2}, {"answer": "آثار", "clue": "بقايا الحضارات القديمة", "row": 6, "col": 0, "dir": "h", "num": 5}, {"answer": "فرعون", "clue": "ملك مصر القديم الذي غرق في البحر", "row": 0, "col": 8, "dir": "v", "num": 1}]}, {"id": "a2", "difficulty": "advanced", "category": "figures", "title": "a2", "rows": 9, "cols": 9, "grid": ["#########", "##ص######", "خالد#####", "##ا######", "##حمزة###", "####ك####", "##إبراهيم", "####ي####", "###طارق##"], "words": [{"answer": "حمزة", "clue": "عم النبي ولقب بأسد الله", "row": 4, "col": 2, "dir": "h", "num": 3}, {"answer": "زكريا", "clue": "نبي والد يحيى عليهما السلام", "row": 4, "col": 4, "dir": "v", "num": 4}, {"answer": "طارق", "clue": "قائد فتح الأندلس", "row": 8, "col": 3, "dir": "h", "num": 6}, {"answer": "صلاح", "clue": "قائد مسلم حرر القدس من الصليبيين", "row": 1, "col": 2, "dir": "v", "num": 1}, {"answer": "خالد", "clue": "قائد مسلم لقب بسيف الله المسلول", "row": 2, "col": 0, "dir": "h", "num": 2}, {"answer": "إبراهيم", "clue": "نبي بنى الكعبة مع ابنه إسماعيل", "row": 6, "col": 2, "dir": "h", "num": 5}]}, {"id": "a3", "difficulty": "advanced", "category": "sports", "title": "a3", "rows": 9, "cols": 9, "grid": ["#######س#", "#######ب#", "####س##ا#", "####ب##ح#", "#ميدالية#", "#د##ق####", "فريق#####", "#ب#######", "#########"], "words": [{"answer": "ميدالية", "clue": "جائزة معدنية تعطى للفائزين", "row": 4, "col": 1, "dir": "h", "num": 3}, {"answer": "سباق", "clue": "منافسة في الجري بين المتسابقين", "row": 2, "col": 4, "dir": "v", "num": 2}, {"answer": "مدرب", "clue": "من يدرب الفريق ويضع خطته", "row": 4, "col": 1, "dir": "v", "num": 3}, {"answer": "فريق", "clue": "مجموعة لاعبين يلعبون معا", "row": 6, "col": 0, "dir": "h", "num": 4}, {"answer": "سباحة", "clue": "رياضة تمارس في الماء", "row": 0, "col": 7, "dir": "v", "num": 1}]}, {"id": "a4", "difficulty": "advanced", "category": "science", "title": "a4", "rows": 9, "cols": 9, "grid": ["##حضارة##", "####ل####", "###ضمير##", "####غ####", "##بيروت##", "####ب#ف##", "######ا##", "#####محيط", "#########"], "words": [{"answer": "بيروت", "clue": "عاصمة لبنان", "row": 4, "col": 2, "dir": "h", "num": 4}, {"answer": "المغرب", "clue": "دولة عربية عاصمتها الرباط", "row": 0, "col": 4, "dir": "v", "num": 2}, {"answer": "حضارة", "clue": "تقدم شعب في العلم والعمران", "row": 0, "col": 2, "dir": "h", "num": 1}, {"answer": "تفاح", "clue": "فاكهة حمراء أو خضراء", "row": 4, "col": 6, "dir": "v", "num": 5}, {"answer": "محيط", "clue": "مسطح مائي واسع يحيط بالقارات", "row": 7, "col": 5, "dir": "h", "num": 6}, {"answer": "ضمير", "clue": "كلمة تحل محل الاسم مثل هو وهي", "row": 2, "col": 3, "dir": "h", "num": 3}]}, {"id": "a5", "difficulty": "advanced", "category": "general", "title": "a5", "rows": 9, "cols": 9, "grid": ["#########", "#########", "#######أ#", "####ا##ه#", "##أطلس#ر#", "#د##أ##ا#", "#الخرطوم#", "#و##د####", "#د#صنعاء#"], "words": [{"answer": "أطلس", "clue": "جبال تقع في المغرب", "row": 4, "col": 2, "dir": "h", "num": 3}, {"answer": "الأردن", "clue": "دولة عربية عاصمتها عمان", "row": 3, "col": 4, "dir": "v", "num": 2}, {"answer": "الخرطوم", "clue": "عاصمة السودان", "row": 6, "col": 1, "dir": "h", "num": 5}, {"answer": "داود", "clue": "نبي آتاه الله الزبور", "row": 5, "col": 1, "dir": "v", "num": 4}, {"answer": "صنعاء", "clue": "عاصمة اليمن", "row": 8, "col": 3, "dir": "h", "num": 6}, {"answer": "أهرام", "clue": "مقابر ملوك مصر القديمة في الجيزة", "row": 2, "col": 7, "dir": "v", "num": 1}]}, {"id": "a6", "difficulty": "advanced", "category": "language", "title": "a6", "rows": 9, "cols": 9, "grid": ["#########", "##م##ح###", "##ع##صلاة", "##ل##ا#ل#", "##مؤذن#ع#", "#######ر#", "#######ا#", "#######ق#", "#########"], "words": [{"answer": "مؤذن", "clue": "من ينادي للصلاة من المئذنة", "row": 4, "col": 2, "dir": "h", "num": 5}, {"answer": "حصان", "clue": "حيوان يركبه الإنسان ويجري بسرعة", "row": 1, "col": 5, "dir": "v", "num": 2}, {"answer": "صلاة", "clue": "عبادة يؤديها المسلم خمس مرات في اليوم", "row": 2, "col": 5, "dir": "h", "num": 3}, {"answer": "العراق", "clue": "دولة عربية عاصمتها بغداد", "row": 2, "col": 7, "dir": "v", "num": 4}, {"answer": "معلم", "clue": "من يعلم التلاميذ في المدرسة", "row": 1, "col": 2, "dir": "v", "num": 1}]}, {"id": "e1", "difficulty": "expert", "category": "animals", "title": "e1", "rows": 9, "cols": 9, "grid": ["#########", "#########", "#فاعل####", "##ل##ك###", "##جمهور##", "##ز##ك###", "بلال#ب###", "##ئ######", "كسري#####"], "words": [{"answer": "جمهور", "clue": "من يشاهد المباراة ويشجع فريقه", "row": 4, "col": 2, "dir": "h", "num": 4}, {"answer": "كوكب", "clue": "جرم يدور حول الشمس", "row": 3, "col": 5, "dir": "v", "num": 3}, {"answer": "الجزائر", "clue": "أكبر دولة عربية من حيث المساحة", "row": 2, "col": 2, "dir": "v", "num": 2}, {"answer": "بلال", "clue": "مؤذن النبي صلى الله عليه وسلم", "row": 6, "col": 0, "dir": "h", "num": 5}, {"answer": "فاعل", "clue": "من قام بالفعل في الجملة", "row": 2, "col": 1, "dir": "h", "num": 1}, {"answer": "كسري", "clue": "لقب ملوك الفرس قديما", "row": 8, "col": 0, "dir": "h", "num": 6}]}, {"id": "e2", "difficulty": "expert", "category": "history", "title": "e2", "rows": 9, "cols": 9, "grid": ["####رياح#", "######ل##", "####صحراء", "##ا###ب##", "##ليبيا##", "##د###ط##", "ركوع#####", "##ح######", "##ة######"], "words": [{"answer": "ليبيا", "clue": "دولة عربية عاصمتها طرابلس", "row": 4, "col": 2, "dir": "h", "num": 5}, {"answer": "الرباط", "clue": "عاصمة المغرب", "row": 0, "col": 6, "dir": "v", "num": 2}, {"answer": "صحراء", "clue": "أرض رملية جافة واسعة", "row": 2, "col": 4, "dir": "h", "num": 3}, {"answer": "الدوحة", "clue": "عاصمة قطر", "row": 3, "col": 2, "dir": "v", "num": 4}, {"answer": "رياح", "clue": "هواء يتحرك في الجو", "row": 0, "col": 4, "dir": "h", "num": 1}, {"answer": "ركوع", "clue": "انحناء في الصلاة بعد القيام", "row": 6, "col": 0, "dir": "h", "num": 6}]}, {"id": "e3", "difficulty": "expert", "category": "islamic", "title": "e3", "rows": 9, "cols": 9, "grid": ["#########", "####زلزال", "######ك##", "###ا##ا##", "##خليفة##", "###ك#####", "###و#####", "#بطيخ####", "###ت#####"], "words": [{"answer": "خليفة", "clue": "من تولى أمر المسلمين بعد النبي", "row": 4, "col": 2, "dir": "h", "num": 4}, {"answer": "الكويت", "clue": "دولة عربية عاصمتها مدينة الكويت", "row": 3, "col": 3, "dir": "v", "num": 3}, {"answer": "بطيخ", "clue": "فاكهة كبيرة خضراء من الخارج حمراء من الداخل", "row": 7, "col": 1, "dir": "h", "num": 5}, {"answer": "زكاة", "clue": "مال يخرجه المسلم للفقراء", "row": 1, "col": 6, "dir": "v", "num": 2}, {"answer": "زلزال", "clue": "اهتزاز يحدث في باطن الأرض", "row": 1, "col": 4, "dir": "h", "num": 1}]}, {"id": "e4", "difficulty": "expert", "category": "geography", "title": "e4", "rows": 9, "cols": 9, "grid": ["####نخلة#", "##ب###ب##", "شطرنج#ن##", "##ك###ا##", "##اليمن##", "##ن##ر###", "#####آ###", "#####ة###", "#########"], "words": [{"answer": "اليمن", "clue": "دولة عربية عاصمتها صنعاء", "row": 4, "col": 2, "dir": "h", "num": 5}, {"answer": "لبنان", "clue": "دولة عربية عاصمتها بيروت", "row": 0, "col": 6, "dir": "v", "num": 2}, {"answer": "بركان", "clue": "جبل يقذف الحمم الملتهبة", "row": 1, "col": 2, "dir": "v", "num": 3}, {"answer": "شطرنج", "clue": "لعبة ذهنية تلعب على رقعة مربعات", "row": 2, "col": 0, "dir": "h", "num": 4}, {"answer": "نخلة", "clue": "شجرة تنتج التمر", "row": 0, "col": 4, "dir": "h", "num": 1}, {"answer": "مرآة", "clue": "سطح يعكس صورة من يقف أمامه", "row": 4, "col": 5, "dir": "v", "num": 6}]}, {"id": "e5", "difficulty": "expert", "category": "riddles", "title": "e5", "rows": 9, "cols": 9, "grid": ["###كهرباء", "######ل##", "####ع#ا##", "####م#غ##", "##زرافة##", "##ي#ن####", "##ت######", "غروب#####", "##ن######"], "words": [{"answer": "زرافة", "clue": "حيوان طويل الرقبة", "row": 4, "col": 2, "dir": "h", "num": 4}, {"answer": "زيتون", "clue": "شجرة مباركة تنتج الزيت", "row": 4, "col": 2, "dir": "v", "num": 4}, {"answer": "غروب", "clue": "وقت اختفاء الشمس في المساء", "row": 7, "col": 0, "dir": "h", "num": 5}, {"answer": "بلاغة", "clue": "علم حسن الكلام وفصاحته", "row": 0, "col": 6, "dir": "v", "num": 2}, {"answer": "كهرباء", "clue": "طاقة تشغل الأجهزة والأنوار", "row": 0, "col": 3, "dir": "h", "num": 1}, {"answer": "عمان", "clue": "دولة عربية عاصمتها مسقط", "row": 2, "col": 4, "dir": "v", "num": 3}]}, {"id": "e6", "difficulty": "expert", "category": "geography", "title": "e6", "rows": 9, "cols": 9, "grid": ["#########", "##ح######", "##د#ص#س##", "##ي#ب#ل##", "#عثماني##", "####ح#م##", "######ا##", "###قرآن##", "#########"], "words": [{"answer": "عثماني", "clue": "نسبة إلى دولة حكمت بلادا كثيرة قرونا", "row": 4, "col": 1, "dir": "h", "num": 4}, {"answer": "صباح", "clue": "أول النهار بعد الفجر", "row": 2, "col": 4, "dir": "v", "num": 2}, {"answer": "سليمان", "clue": "نبي آتاه الله ملكا عظيما", "row": 2, "col": 6, "dir": "v", "num": 3}, {"answer": "حديث", "clue": "قول النبي صلى الله عليه وسلم", "row": 1, "col": 2, "dir": "v", "num": 1}, {"answer": "قرآن", "clue": "كتاب الله المنزل على النبي محمد صلى الله عليه وسلم", "row": 7, "col": 3, "dir": "h", "num": 5}]}];

const STORE_KEY = 'crossword_hessamx_v1';
const DIFF_ORDER = ['beginner', 'intermediate', 'advanced', 'expert'];
const DIFFS = {
  beginner:     { name: 'المبتدئ',  icon: '🌱' },
  intermediate: { name: 'المتوسط',  icon: '🌿' },
  advanced:     { name: 'المتقدم',  icon: '🔥' },
  expert:       { name: 'الخبير',   icon: '👑' }
};
const CATS = {
  islamic: 'الثقافة الإسلامية', history: 'التاريخ والحضارات',
  geography: 'الجغرافيا والدول والعواصم', science: 'العلوم والاكتشافات',
  animals: 'الحيوانات والنباتات', sports: 'الرياضة',
  language: 'اللغة العربية', figures: 'الشخصيات التاريخية',
  general: 'المعلومات العامة', riddles: 'الألغاز والأحاجي'
};
const CAT_ICONS = {
  islamic: '🕌', history: '🏛️', geography: '🌍', science: '🔬',
  animals: '🦁', sports: '⚽', language: '📖', figures: '👤',
  general: '💡', riddles: '🧩'
};
const LETTERS = ['ا','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م','ن','ه','و','ي','ة','أ','إ','آ','ؤ','ئ','ى'];
const ACHIEVEMENTS = [
  { id: 'first_win',  icon: '🎖️', name: 'أول فوز',        desc: 'أكمل أول لغز' },
  { id: 'puzzles5',   icon: '🏅', name: 'خمسة ألغاز',     desc: 'أكمل 5 ألغاز' },
  { id: 'puzzles10',  icon: '🥇', name: 'عشرة ألغاز',     desc: 'أكمل 10 ألغاز' },
  { id: 'puzzles24',  icon: '👑', name: 'بطل الكلمات',    desc: 'أكمل كل الألغاز الـ24' },
  { id: 'words50',    icon: '📝', name: '50 كلمة',        desc: 'حلّ 50 كلمة' },
  { id: 'words100',   icon: '📚', name: '100 كلمة',       desc: 'حلّ 100 كلمة' },
  { id: 'coins500',   icon: '💰', name: 'جامع العملات',   desc: 'اكسب 500 عملة' },
  { id: 'streak3',    icon: '🔥', name: 'سلسلة 3 أيام',   desc: 'سلسلة مكافآت 3 أيام متتالية' }
];

/* ---------- الحالة ---------- */
function defaultState() {
  return {
    coins: 100, coinsEarned: 0,
    completed: {},            // puzzleId -> {stars, date}
    solvedWordKeys: {},       // "puzzleId:wordIndex" -> true
    attempts: 0, correct: 0,
    bestStreak: 0, currentStreak: 0,
    lastRewardDate: null, lastDailyDate: null,
    achievements: {},         // achId -> date
    settings: { theme: 'auto', sound: true, vibrate: true, instant: true },
    inProgress: null          // {puzzleId, cells, revealed[], solved[], hintsUsed, errors, elapsed, daily}
  };
}
let state = defaultState();
function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      state = Object.assign(defaultState(), s);
      state.settings = Object.assign(defaultState().settings, s.settings || {});
    }
  } catch (e) { state = defaultState(); }
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
}

/* ---------- أدوات ---------- */
const $ = (id) => document.getElementById(id);
let toastTimer = null;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 2600);
}
function todayStr(d) {
  d = d || new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function yesterdayStr() {
  const d = new Date(); d.setDate(d.getDate() - 1); return todayStr(d);
}
function norm(ch) {
  if (!ch) return '';
  return ch.replace(/[أإآٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي');
}
function fmtTime(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}
function starsText(n) {
  let s = '';
  for (let i = 0; i < 3; i++) s += (i < n) ? '★' : '☆';
  return s;
}
function wordsSolvedCount() { return Object.keys(state.solvedWordKeys || {}).length; }
function completedCount() { return Object.keys(state.completed || {}).length; }

/* ---------- الصوت والاهتزاز ---------- */
let audioCtx = null;
function beep(freq, dur, type, when) {
  if (!state.settings.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    const t = audioCtx.currentTime + (when || 0);
    g.gain.setValueAtTime(0.15, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(t); o.stop(t + dur);
  } catch (e) {}
}
function sndClick() { beep(600, 0.06, 'sine', 0); }
function sndCorrect() { beep(880, 0.09, 'sine', 0); }
function sndWrong() { beep(170, 0.18, 'sawtooth', 0); }
function sndWin() { beep(523, 0.12, 'sine', 0); beep(659, 0.12, 'sine', 0.12); beep(784, 0.2, 'sine', 0.24); }
function buzz(pattern) {
  if (state.settings.vibrate && navigator.vibrate) {
    try { navigator.vibrate(pattern); } catch (e) {}
  }
}

/* ---------- المظهر ---------- */
function applyTheme() {
  const t = state.settings.theme;
  let dark = false;
  if (t === 'dark') dark = true;
  else if (t === 'auto') dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.body.classList.toggle('dark', dark);
}
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
}

/* ---------- الألغاز ---------- */
let PUZZLES = [];
function getPuzzle(id) { return PUZZLES.find(p => p.id === id) || null; }
function puzzlesByDiff(diff) { return PUZZLES.filter(p => p.difficulty === diff); }
function isUnlocked(p) {
  const list = puzzlesByDiff(p.difficulty);
  const i = list.findIndex(x => x.id === p.id);
  if (i <= 0) return true;
  return !!state.completed[list[i - 1].id];
}
function dailyPuzzle() {
  const dayNum = Math.floor(Date.now() / 86400000);
  return PUZZLES[dayNum % PUZZLES.length];
}
function puzzleLabel(p) {
  const list = puzzlesByDiff(p.difficulty);
  const i = list.findIndex(x => x.id === p.id);
  return 'لغز ' + (i + 1) + ' — ' + DIFFS[p.difficulty].name;
}

/* ---------- التنقل بين الشاشات ---------- */
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = $('screen-' + name);
  if (el) el.classList.add('active');
  window.scrollTo(0, 0);
}
function goTo(name) {
  sndClick();
  if (name === 'home') renderHome();
  if (name === 'levels') renderLevels();
  if (name === 'categories') renderCategories();
  if (name === 'achievements') renderAchievements();
  if (name === 'stats') renderStats();
  showScreen(name);
}
function updateCoinsUI() {
  ['coins-value', 'coins-play'].forEach(id => {
    const el = $(id); if (el) el.textContent = state.coins;
  });
}

/* ---------- الرئيسية ---------- */
function renderHome() {
  updateCoinsUI();
  const done = completedCount();
  $('home-progress-text').textContent = done + ' / ' + PUZZLES.length + ' لغزاً مكتملاً';
  $('home-progress-fill').style.width = (PUZZLES.length ? Math.round(done / PUZZLES.length * 100) : 0) + '%';
  const achDone = Object.keys(state.achievements || {}).length;
  $('ach-count').textContent = achDone + ' / ' + ACHIEVEMENTS.length + ' شارات';
  const dp = dailyPuzzle();
  $('daily-status').textContent = state.lastDailyDate === todayStr()
    ? 'تم إنجاز لغز اليوم ✓'
    : 'لغز اليوم: ' + puzzleLabel(dp);
  $('reward-status').textContent = state.lastRewardDate === todayStr()
    ? 'تم استلام مكافأة اليوم ✓'
    : '+50 عملة كل يوم';
}

/* ---------- المستويات ---------- */
function renderLevels() {
  const box = $('levels-list'); box.innerHTML = '';
  DIFF_ORDER.forEach(diff => {
    const list = puzzlesByDiff(diff);
    const done = list.filter(p => state.completed[p.id]).length;
    const stars = list.reduce((a, p) => a + (state.completed[p.id] ? state.completed[p.id].stars : 0), 0);
    const b = document.createElement('button');
    b.className = 'list-item';
    b.innerHTML = '<span><b>' + DIFFS[diff].icon + ' ' + DIFFS[diff].name + '</b><br>' +
      '<span class="meta">' + done + ' / ' + list.length + ' ألغاز • ' + stars + ' ★</span></span><span>‹</span>';
    b.onclick = () => { renderLevelPuzzles(diff); showScreen('level-puzzles'); };
    box.appendChild(b);
  });
}
function puzzleRow(p, onClick) {
  const b = document.createElement('button');
  const done = state.completed[p.id];
  const unlocked = isUnlocked(p);
  b.className = 'list-item' + (unlocked ? '' : ' locked');
  b.innerHTML = '<span><b>' + (unlocked ? '🧩 ' : '🔒 ') + puzzleLabel(p) + '</b><br>' +
    '<span class="meta">' + CATS[p.category] + ' • ' + p.words.length + ' كلمات' +
    (done ? ' • مكتمل' : '') + '</span></span>' +
    '<span class="stars">' + (done ? starsText(done.stars) : (unlocked ? '○' : '🔒')) + '</span>';
  b.onclick = () => {
    if (!unlocked) { toast('🔒 أكمل اللغز السابق لفتح هذا اللغز'); return; }
    onClick(p);
  };
  return b;
}
function renderLevelPuzzles(diff) {
  $('level-puzzles-title').textContent = DIFFS[diff].name + ' — الألغاز';
  const box = $('level-puzzles-list'); box.innerHTML = '';
  puzzlesByDiff(diff).forEach(p => box.appendChild(puzzleRow(p, (pp) => startPuzzle(pp.id, { daily: false }))));
}

/* ---------- التصنيفات ---------- */
function renderCategories() {
  const box = $('categories-list'); box.innerHTML = '';
  Object.keys(CATS).forEach(cat => {
    const list = PUZZLES.filter(p => p.category === cat);
    const done = list.filter(p => state.completed[p.id]).length;
    const b = document.createElement('button');
    b.className = 'list-item';
    b.innerHTML = '<span><b>' + CAT_ICONS[cat] + ' ' + CATS[cat] + '</b><br>' +
      '<span class="meta">' + list.length + ' ألغاز • ' + done + ' مكتملة</span></span><span>‹</span>';
    b.onclick = () => { renderCategoryPuzzles(cat); showScreen('category-puzzles'); };
    box.appendChild(b);
  });
}
function renderCategoryPuzzles(cat) {
  $('category-puzzles-title').textContent = CATS[cat];
  const box = $('category-puzzles-list'); box.innerHTML = '';
  PUZZLES.filter(p => p.category === cat).forEach(p =>
    box.appendChild(puzzleRow(p, (pp) => startPuzzle(pp.id, { daily: false }))));
}

/* ---------- التحدي اليومي والمكافأة اليومية ---------- */
function doDailyChallenge() {
  const dp = dailyPuzzle();
  if (!dp) return;
  startPuzzle(dp.id, { daily: true });
}
function doDailyReward() {
  const today = todayStr();
  if (state.lastRewardDate === today) { toast('🎁 استلمت مكافأة اليوم — عُد غداً'); return; }
  if (state.lastRewardDate === yesterdayStr()) state.currentStreak += 1;
  else state.currentStreak = 1;
  if (state.currentStreak > state.bestStreak) state.bestStreak = state.currentStreak;
  state.lastRewardDate = today;
  state.coins += 50;
  state.coinsEarned += 50;
  saveState(); updateCoinsUI(); renderHome();
  sndWin();
  toast('🎁 +50 عملة! سلسلتك: ' + state.currentStreak + ' يوم متتالٍ');
  checkAchievements();
}

/* ---------- الإنجازات ---------- */
function checkAchievements() {
  const done = completedCount(), words = wordsSolvedCount();
  const conds = {
    first_win: done >= 1, puzzles5: done >= 5, puzzles10: done >= 10,
    puzzles24: done >= PUZZLES.length && PUZZLES.length > 0,
    words50: words >= 50, words100: words >= 100,
    coins500: state.coinsEarned >= 500, streak3: state.bestStreak >= 3
  };
  ACHIEVEMENTS.forEach(a => {
    if (conds[a.id] && !state.achievements[a.id]) {
      state.achievements[a.id] = todayStr();
      saveState();
      setTimeout(() => toast('🏆 إنجاز جديد: ' + a.name + ' — ' + a.desc), 300);
    }
  });
}
function renderAchievements() {
  const box = $('achievements-list'); box.innerHTML = '';
  ACHIEVEMENTS.forEach(a => {
    const got = !!state.achievements[a.id];
    const div = document.createElement('div');
    div.className = 'list-item' + (got ? '' : ' locked');
    div.innerHTML = '<span><span class="ach-icon">' + (got ? a.icon : '🔒') + '</span> <b>' + a.name + '</b><br>' +
      '<span class="meta">' + a.desc + (got ? ' • ' + state.achievements[a.id] : ' • غير مفتوح بعد') + '</span></span>' +
      '<span>' + (got ? '✅' : '') + '</span>';
    box.appendChild(div);
  });
}

/* ---------- الإحصائيات ---------- */
function renderStats() {
  const acc = state.attempts > 0 ? Math.round(state.correct / state.attempts * 100) : 100;
  const rows = [
    ['🧩 ألغاز مكتملة', completedCount() + ' / ' + PUZZLES.length],
    ['📝 كلمات محلولة', String(wordsSolvedCount())],
    ['🪙 عملات مكتسبة', String(state.coinsEarned)],
    ['💰 رصيدك الحالي', String(state.coins)],
    ['🔥 أفضل سلسلة أيام', String(state.bestStreak)],
    ['🎯 نسبة الدقة', acc + '%']
  ];
  const box = $('stats-list'); box.innerHTML = '';
  rows.forEach(r => {
    const div = document.createElement('div');
    div.className = 'stat-row';
    div.innerHTML = '<span>' + r[0] + '</span><b>' + r[1] + '</b>';
    box.appendChild(div);
  });
}

/* ---------- الإعدادات ---------- */
function bindSettings() {
  $('set-theme').value = state.settings.theme;
  $('set-sound').checked = !!state.settings.sound;
  $('set-vibrate').checked = !!state.settings.vibrate;
  $('set-instant').checked = !!state.settings.instant;
  $('set-theme').onchange = (e) => { state.settings.theme = e.target.value; saveState(); applyTheme(); toast('تم تغيير المظهر'); };
  $('set-sound').onchange = (e) => { state.settings.sound = e.target.checked; saveState(); };
  $('set-vibrate').onchange = (e) => { state.settings.vibrate = e.target.checked; saveState(); };
  $('set-instant').onchange = (e) => { state.settings.instant = e.target.checked; saveState(); toast(e.target.checked ? 'التحقق الفوري مفعّل' : 'التحقق الفوري متوقف — استخدم زر «تحقق»'); };
  $('btn-reset').onclick = () => {
    if (!confirm('هل أنت متأكد؟ سيتم حذف كل التقدم والعملات والإنجازات نهائياً.')) return;
    const keepTheme = state.settings.theme;
    state = defaultState();
    state.settings.theme = keepTheme;
    saveState(); applyTheme(); bindSettings(); renderHome();
    toast('تمت إعادة تعيين كل التقدم');
  };
}

/* ---------- اللعب ---------- */
let cur = null;            // اللغز الحالي
let cells = {};            // "r,c" -> حرف
let revealed = new Set();  // خلايا مكشوفة بالمساعدات (مقفلة)
let solvedIdx = new Set(); // مؤشرات الكلمات المكتملة في هذه الجولة
let sel = { r: 0, c: 0, dir: 'h' };
let hintsUsed = 0, errors = 0, elapsed = 0, timerId = null, paused = false;
let dailyMode = false, returnScreen = 'home', showWrong = false;
let extraShown = new Set();
let winShown = false;

function key(r, c) { return r + ',' + c; }
function solChar(r, c) { return (cur.grid[r] || '')[c] || '#'; }
function isBlack(r, c) { return solChar(r, c) === '#'; }
function wordCells(w) {
  const out = [];
  for (let i = 0; i < w.answer.length; i++) {
    const r = w.dir === 'v' ? w.row + i : w.row;
    const c = w.dir === 'h' ? w.col + i : w.col;
    out.push({ r, c, ch: solChar(r, c) });
  }
  return out;
}
function wordsAt(r, c) {
  const h = cur.words.find(w => w.dir === 'h' && r === w.row && c >= w.col && c < w.col + w.answer.length) || null;
  const v = cur.words.find(w => w.dir === 'v' && c === w.col && r >= w.row && r < w.row + w.answer.length) || null;
  return { h, v };
}
function selectedWord() {
  const w = wordsAt(sel.r, sel.c);
  return sel.dir === 'h' ? (w.h || w.v) : (w.v || w.h);
}
function isWordSolved(w) {
  return wordCells(w).every(cell => cells[key(cell.r, cell.c)] && norm(cells[key(cell.r, cell.c)]) === norm(cell.ch));
}
function cellCorrect(r, c) {
  const v = cells[key(r, c)];
  return v ? norm(v) === norm(solChar(r, c)) : false;
}

function startPuzzle(id, opts) {
  const p = getPuzzle(id);
  if (!p) { toast('اللغز غير موجود'); return; }
  cur = p; dailyMode = !!(opts && opts.daily);
  returnScreen = dailyMode ? 'home' : 'home';
  cells = {}; revealed = new Set(); solvedIdx = new Set();
  hintsUsed = 0; errors = 0; elapsed = 0; paused = false; showWrong = false;
  extraShown = new Set(); winShown = false;
  // استئناف تقدّم محفوظ لنفس اللغز
  if (state.inProgress && state.inProgress.puzzleId === id) {
    const ip = state.inProgress;
    cells = Object.assign({}, ip.cells || {});
    revealed = new Set(ip.revealed || []);
    solvedIdx = new Set(ip.solved || []);
    hintsUsed = ip.hintsUsed || 0; errors = ip.errors || 0; elapsed = ip.elapsed || 0;
    dailyMode = !!ip.daily;
    toast('↩ تم استئناف تقدّمك المحفوظ');
  }
  $('play-title').textContent = puzzleLabel(p) + ' • ' + CATS[p.category];
  $('extra-hint-box').classList.add('hidden');
  $('pause-overlay').classList.add('hidden');
  buildGrid(); buildClues(); buildKeyboard();
  // أول خلية: بداية أول كلمة غير مكتملة
  const first = cur.words.find(w => !solvedIdx.has(cur.words.indexOf(w))) || cur.words[0];
  sel = { r: first.row, c: first.col, dir: first.dir };
  renderGrid(); renderClueBar(); updatePlayMeta();
  startTimer();
  showScreen('play');
}

function buildGrid() {
  const g = $('grid'); g.innerHTML = '';
  const starts = {};
  cur.words.forEach(w => { starts[key(w.row, w.col)] = w.num; });
  for (let r = 0; r < cur.rows; r++) {
    for (let c = 0; c < cur.cols; c++) {
      const d = document.createElement('div');
      if (isBlack(r, c)) { d.className = 'cell black'; }
      else {
        d.className = 'cell';
        d.dataset.r = r; d.dataset.c = c;
        if (starts[key(r, c)]) {
          const n = document.createElement('span');
          n.className = 'num'; n.textContent = starts[key(r, c)];
          d.appendChild(n);
        }
        d.addEventListener('click', () => onCellClick(r, c));
      }
      g.appendChild(d);
    }
  }
}
function buildClues() {
  const fill = (ulId, dir) => {
    const ul = $(ulId); ul.innerHTML = '';
    cur.words.filter(w => w.dir === dir).sort((a, b) => a.num - b.num).forEach(w => {
      const idx = cur.words.indexOf(w);
      const li = document.createElement('li');
      li.dataset.widx = idx;
      li.innerHTML = '<b>' + w.num + '.</b> ' + w.clue + ' <span class="meta">(' + w.answer.length + ' حروف)</span>';
      li.onclick = () => { selectWord(w); };
      ul.appendChild(li);
    });
  };
  fill('clues-h', 'h'); fill('clues-v', 'v');
}
function buildKeyboard() {
  const kb = $('keyboard'); kb.innerHTML = '';
  LETTERS.forEach(ch => {
    const b = document.createElement('button');
    b.className = 'key'; b.textContent = ch;
    b.onclick = () => typeLetter(ch);
    kb.appendChild(b);
  });
  const del = document.createElement('button');
  del.className = 'key key-wide'; del.textContent = '⌫ حذف';
  del.onclick = () => deleteLetter();
  kb.appendChild(del);
}

function renderGrid() {
  const w = selectedWord();
  const inWord = new Set();
  if (w) wordCells(w).forEach(cell => inWord.add(key(cell.r, cell.c)));
  document.querySelectorAll('#grid .cell:not(.black)').forEach(d => {
    const r = +d.dataset.r, c = +d.dataset.c, k = key(r, c);
    const numSpan = d.querySelector('.num');
    Array.from(d.childNodes).forEach(n => { if (n.nodeType === 3) d.removeChild(n); });
    const v = cells[k] || '';
    if (v) d.appendChild(document.createTextNode(v));
    d.classList.toggle('in-word', inWord.has(k));
    d.classList.toggle('selected', sel.r === r && sel.c === c);
    const owner = cur.words.find(ww => solvedIdx.has(cur.words.indexOf(ww)) &&
      wordCells(ww).some(cell => cell.r === r && cell.c === c));
    d.classList.toggle('done', !!owner);
    d.classList.toggle('wrong', !!(v && state.settings.instant && !cellCorrect(r, c)) ||
      !!(v && showWrong && !cellCorrect(r, c)));
    if (numSpan && !d.querySelector('.num')) d.insertBefore(numSpan, d.firstChild);
  });
  document.querySelectorAll('#clues-h li, #clues-v li').forEach(li => {
    const idx = +li.dataset.widx;
    li.classList.toggle('done', solvedIdx.has(idx));
    li.classList.toggle('active', !!w && cur.words.indexOf(w) === idx);
  });
}
function renderClueBar() {
  const w = selectedWord();
  $('current-clue').textContent = w
    ? w.num + ' — ' + (w.dir === 'h' ? 'أفقي' : 'عمودي') + ': ' + w.clue + ' (' + w.answer.length + ' حروف)'
    : 'اختر خلية لبدء اللعب';
}
function updatePlayMeta() {
  $('play-timer').textContent = '⏱ ' + fmtTime(elapsed);
  $('play-progress').textContent = solvedIdx.size + ' / ' + cur.words.length + ' كلمة';
  updateCoinsUI();
}

function selectWord(w) {
  sel = { r: w.row, c: w.col, dir: w.dir };
  renderGrid(); renderClueBar(); sndClick();
}
function onCellClick(r, c) {
  if (paused) return;
  const w = wordsAt(r, c);
  if (sel.r === r && sel.c === c) {
    if (w.h && w.v) sel.dir = sel.dir === 'h' ? 'v' : 'h';
  } else {
    sel = { r, c, dir: (w.h ? 'h' : (w.v ? 'v' : sel.dir)) };
    if (sel.dir === 'h' && !w.h && w.v) sel.dir = 'v';
    if (sel.dir === 'v' && !w.v && w.h) sel.dir = 'h';
  }
  renderGrid(); renderClueBar(); sndClick();
}
function typeLetter(ch) {
  if (paused || !cur) return;
  const k = key(sel.r, sel.c);
  if (revealed.has(k)) { toast('هذا الحرف مكشوف بالمساعدة ولا يمكن تغييره'); return; }
  const w = selectedWord();
  if (w && solvedIdx.has(cur.words.indexOf(w))) { toast('هذه الكلمة مكتملة — اختر كلمة أخرى'); return; }
  const wasEmpty = !cells[k];
  cells[k] = ch;
  state.attempts += 1;
  if (norm(ch) === norm(solChar(sel.r, sel.c))) { state.correct += 1; sndCorrect(); }
  else { errors += 1; sndWrong(); buzz(60); }
  saveProgress(); renderGrid();
  if (w) checkWordDone(w);
  if (!winShown) advanceInWord();
  updatePlayMeta();
}
function advanceInWord() {
  const w = selectedWord();
  if (!w) return;
  const cs = wordCells(w);
  const i = cs.findIndex(cell => cell.r === sel.r && cell.c === sel.c);
  if (i >= 0 && i < cs.length - 1) {
    sel.r = cs[i + 1].r; sel.c = cs[i + 1].c;
    renderGrid(); return;
  }
  // نهاية الكلمة: انتقل لأول خلية ناقصة في الكلمة التالية غير المكتملة
  const next = cur.words.find(ww => !solvedIdx.has(cur.words.indexOf(ww)) &&
    wordCells(ww).some(cell => !cells[key(cell.r, cell.c)]));
  if (next) {
    const empty = wordCells(next).find(cell => !cells[key(cell.r, cell.c)]);
    sel = { r: empty.r, c: empty.c, dir: next.dir };
    renderGrid(); renderClueBar();
  }
}
function deleteLetter() {
  if (paused || !cur) return;
  const k = key(sel.r, sel.c);
  if (cells[k] && !revealed.has(k)) {
    delete cells[k];
    saveProgress(); renderGrid(); sndClick(); return;
  }
  // إن كانت فارغة ارجع خلية للخلف وامسحها
  const w = selectedWord();
  if (!w) return;
  const cs = wordCells(w);
  const i = cs.findIndex(cell => cell.r === sel.r && cell.c === sel.c);
  if (i > 0) {
    const prev = cs[i - 1];
    sel.r = prev.r; sel.c = prev.c;
    const pk = key(prev.r, prev.c);
    if (cells[pk] && !revealed.has(pk)) delete cells[pk];
    saveProgress(); renderGrid(); renderClueBar(); sndClick();
  }
}
function checkWordDone(w) {
  const idx = cur.words.indexOf(w);
  if (solvedIdx.has(idx) || !isWordSolved(w)) return;
  solvedIdx.add(idx);
  const kkey = cur.id + ':' + idx;
  if (!state.solvedWordKeys[kkey]) state.solvedWordKeys[kkey] = true;
  saveState();
  sndCorrect();
  toast('✔ أحسنت! أكملت كلمة «' + w.answer + '»');
  // انتقال تلقائي لأول خلية ناقصة في الكلمة التالية
  setTimeout(() => {
    if (winShown) return;
    const next = cur.words.find(ww => !solvedIdx.has(cur.words.indexOf(ww)));
    if (next) {
      const empty = wordCells(next).find(cell => !cells[key(cell.r, cell.c)]);
      if (empty) { sel = { r: empty.r, c: empty.c, dir: next.dir }; }
    }
    renderGrid(); renderClueBar(); updatePlayMeta();
    if (solvedIdx.size === cur.words.length) finishPuzzle();
  }, 350);
}
function checkAll() {
  if (paused || !cur) return;
  let wrong = 0;
  Object.keys(cells).forEach(k => {
    const parts = k.split(','); const r = +parts[0], c = +parts[1];
    if (!cellCorrect(r, c)) wrong++;
  });
  showWrong = true; renderGrid();
  setTimeout(() => { showWrong = false; renderGrid(); }, 1800);
  if (wrong === 0) { toast('✔ لا توجد حروف خاطئة حتى الآن'); sndCorrect(); }
  else { toast('✖ يوجد ' + wrong + ' حرف خاطئ (بالأحمر)'); sndWrong(); buzz(80); }
}
function clearWord() {
  const w = selectedWord();
  if (!w) return;
  wordCells(w).forEach(cell => {
    const k = key(cell.r, cell.c);
    if (!revealed.has(k) && !solvedIdx.has(cur.words.indexOf(w))) delete cells[k];
  });
  saveProgress(); renderGrid(); toast('تم مسح الكلمة');
}

/* ---------- المساعدات ---------- */
function spend(amount, label) {
  if (state.coins < amount) {
    toast('🪙 رصيدك غير كافٍ (' + state.coins + ' عملة) — تحتاج ' + amount + ' عملات');
    sndWrong(); return false;
  }
  state.coins -= amount;
  saveState(); updateCoinsUI();
  return true;
}
function hintExtra() {
  const w = selectedWord();
  if (!w) { toast('اختر كلمة أولاً'); return; }
  const idx = cur.words.indexOf(w);
  if (!extraShown.has(idx)) {
    if (!spend(5, 'معنى إضافي')) return;
    extraShown.add(idx);
  }
  hintsUsed += 1; saveProgress();
  const first = w.answer[0], last = w.answer[w.answer.length - 1];
  const box = $('extra-hint-box');
  box.textContent = '💡 تلميح إضافي — الكلمة ' + w.num + ': تتكوّن من ' + w.answer.length + ' حروف، تبدأ بحرف «' + first + '» وتنتهي بحرف «' + last + '».';
  box.classList.remove('hidden');
  sndClick();
}
function hintLetter() {
  const w = selectedWord();
  if (!w) { toast('اختر كلمة أولاً'); return; }
  const empty = wordCells(w).find(cell => !cells[key(cell.r, cell.c)]);
  if (!empty) { toast('الكلمة مملوءة بالكامل'); return; }
  if (!spend(10, 'كشف حرف')) return;
  cells[key(empty.r, empty.c)] = empty.ch;
  revealed.add(key(empty.r, empty.c));
  state.attempts += 1; state.correct += 1;
  hintsUsed += 1; sel = { r: empty.r, c: empty.c, dir: w.dir };
  saveProgress(); renderGrid(); renderClueBar(); updatePlayMeta();
  sndCorrect();
  checkWordDone(w);
}
function hintClearWrong() {
  let wrongKeys = [];
  Object.keys(cells).forEach(k => {
    const parts = k.split(','); const r = +parts[0], c = +parts[1];
    if (!revealed.has(k) && !cellCorrect(r, c)) wrongKeys.push(k);
  });
  if (wrongKeys.length === 0) { toast('لا توجد حروف خاطئة لحذفها'); return; }
  if (!spend(15, 'حذف الخاطئة')) return;
  wrongKeys.forEach(k => delete cells[k]);
  hintsUsed += 1; saveProgress(); renderGrid();
  toast('🧹 تم حذف ' + wrongKeys.length + ' حرف خاطئ');
  sndClick();
}
function hintSolveWord() {
  const w = selectedWord();
  if (!w) { toast('اختر كلمة أولاً'); return; }
  const idx = cur.words.indexOf(w);
  if (solvedIdx.has(idx)) { toast('هذه الكلمة محلولة بالفعل'); return; }
  if (!spend(30, 'حل الكلمة')) return;
  wordCells(w).forEach(cell => {
    cells[key(cell.r, cell.c)] = cell.ch;
    revealed.add(key(cell.r, cell.c));
  });
  state.attempts += w.answer.length; state.correct += w.answer.length;
  hintsUsed += 1; saveProgress(); renderGrid(); updatePlayMeta();
  sndCorrect();
  checkWordDone(w);
}

/* ---------- المؤقت والإيقاف والحفظ ---------- */
function startTimer() {
  stopTimer();
  timerId = setInterval(() => {
    if (!paused && cur) { elapsed += 1; $('play-timer').textContent = '⏱ ' + fmtTime(elapsed); }
  }, 1000);
}
function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }
function saveProgress() {
  if (!cur) return;
  state.inProgress = {
    puzzleId: cur.id, cells: Object.assign({}, cells),
    revealed: Array.from(revealed), solved: Array.from(solvedIdx),
    hintsUsed, errors, elapsed, daily: dailyMode
  };
  saveState();
}
function pauseGame() {
  if (!cur || paused) return;
  paused = true; saveProgress();
  $('pause-overlay').classList.remove('hidden');
}
function resumeGame() {
  paused = false;
  $('pause-overlay').classList.add('hidden');
  sndClick();
}
function exitPlay() {
  saveProgress(); stopTimer(); cur = null;
  renderHome(); showScreen('home');
}

/* ---------- الفوز ---------- */
function finishPuzzle() {
  if (winShown || !cur) return;
  winShown = true;
  stopTimer();
  const firstTime = !state.completed[cur.id];
  const stars = (hintsUsed === 0 && errors === 0) ? 3 : ((hintsUsed <= 2 && errors <= 3) ? 2 : 1);
  const reward = firstTime ? 30 : 10;
  const prev = state.completed[cur.id];
  state.completed[cur.id] = { stars: Math.max(stars, prev ? prev.stars : 0), date: todayStr() };
  state.coins += reward;
  state.coinsEarned += reward;
  if (dailyMode) state.lastDailyDate = todayStr();
  state.inProgress = null;
  saveState(); updateCoinsUI();
  sndWin(); buzz([40, 60, 40, 60, 120]);
  checkAchievements();
  // نجوم الفوز
  let starsHtml = '';
  for (let i = 0; i < 3; i++) starsHtml += '<span class="' + (i < stars ? '' : 'off') + '">★</span>';
  $('win-stars').innerHTML = starsHtml;
  $('win-detail').textContent = puzzleLabel(cur) + ' • الوقت: ' + fmtTime(elapsed) +
    ' • الأخطاء: ' + errors + ' • المساعدات: ' + hintsUsed +
    (dailyMode ? ' • تحدي اليوم ✓' : '');
  $('win-coins').textContent = '🪙 +' + reward + ' عملة' + (firstTime ? ' (أول مرة)' : ' (إعادة)');
  const list = puzzlesByDiff(cur.difficulty);
  const i = list.findIndex(x => x.id === cur.id);
  const next = list[i + 1] || null;
  $('btn-next-puzzle').style.display = next ? '' : 'none';
  $('btn-next-puzzle').onclick = () => { if (next) startPuzzle(next.id, { daily: false }); };
  $('btn-replay').onclick = () => {
    state.inProgress = null; saveState();
    startPuzzle(cur.id, { daily: dailyMode });
  };
  $('btn-win-home').onclick = () => { renderHome(); showScreen('home'); };
  showScreen('win');
}

/* ---------- تحميل البيانات والتهيئة ---------- */
async function loadPuzzles() {
  try {
    const res = await fetch('levels.json', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.puzzles) && data.puzzles.length > 0) {
        PUZZLES = data.puzzles;
        return;
      }
    }
  } catch (e) { /* file:// يمنع fetch — نستخدم النسخة المضمّنة */ }
  PUZZLES = EMBEDDED_PUZZLES.slice();
}
function bindStatic() {
  document.querySelectorAll('[data-go]').forEach(el => {
    el.addEventListener('click', () => goTo(el.dataset.go));
  });
  $('btn-play').onclick = () => goTo('levels');
  $('daily-status').parentElement.onclick = null;
  document.querySelector('[data-go="daily"]').onclick = () => { sndClick(); doDailyChallenge(); };
  document.querySelector('[data-go="reward"]').onclick = () => { sndClick(); doDailyReward(); };
  $('btn-pause').onclick = pauseGame;
  $('btn-resume').onclick = resumeGame;
  $('btn-quit-pause').onclick = () => { $('pause-overlay').classList.add('hidden'); paused = false; exitPlay(); };
  $('btn-exit-play').onclick = exitPlay;
  $('btn-check').onclick = checkAll;
  $('btn-clear-word').onclick = clearWord;
  $('hint-extra').onclick = hintExtra;
  $('hint-letter').onclick = hintLetter;
  $('hint-clear').onclick = hintClearWrong;
  $('hint-solve').onclick = hintSolveWord;
  document.addEventListener('keydown', (e) => {
    if (!$('screen-play').classList.contains('active') || paused || !cur) return;
    if (e.key === 'Backspace') { e.preventDefault(); deleteLetter(); }
  });
}
async function init() {
  loadState();
  applyTheme();
  bindSettings();
  bindStatic();
  await loadPuzzles();
  if (!PUZZLES || PUZZLES.length === 0) {
    document.querySelector('.splash-tag').textContent = 'تعذّر تحميل الألغاز — تأكد من وجود levels.json بجانب index.html';
    return;
  }
  renderHome();
  setTimeout(() => { showScreen('home'); }, 1400);
}
init();
