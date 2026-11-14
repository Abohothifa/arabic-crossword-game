# -*- coding: utf-8 -*-
"""Generate 24 verified Arabic crossword puzzles (136 words) for
تحدي الكلمات المتقاطعة. Output: ../web/levels.json
Each puzzle: 9x9 grid, words intersect in matching letters, every word
intersects at least one other word, no duplicate answers or clues.
"""
import json, random, os, sys

# (answer, clue, category-slug)
BANK = [
# --- islamic ---
("قرآن","كتاب الله المنزل على النبي محمد صلى الله عليه وسلم","islamic"),
("صلاة","عبادة يؤديها المسلم خمس مرات في اليوم","islamic"),
("زكاة","مال يخرجه المسلم للفقراء","islamic"),
("صيام","الامتناع عن الطعام والشراب في شهر رمضان","islamic"),
("حج","ركن الإسلام الخامس وزيارة مكة المكرمة","islamic"),
("مسجد","بيت يصلي فيه المسلمون","islamic"),
("إمام","من يؤم الناس في الصلاة","islamic"),
("مؤذن","من ينادي للصلاة من المئذنة","islamic"),
("رمضان","شهر الصيام عند المسلمين","islamic"),
("شوال","الشهر الذي يأتي بعد رمضان مباشرة","islamic"),
("عيد","مناسبة فرح بعد شهر رمضان","islamic"),
("وضوء","طهارة بالماء قبل الصلاة","islamic"),
("سجود","وضع الجبهة على الأرض في الصلاة","islamic"),
("ركوع","انحناء في الصلاة بعد القيام","islamic"),
("دعاء","طلب من الله عز وجل","islamic"),
("توبة","رجوع إلى الله بعد الذنب","islamic"),
("جنة","دار النعيم في الآخرة","islamic"),
("سورة","جزء من القرآن الكريم","islamic"),
("آية","جملة من جمل القرآن الكريم","islamic"),
("حديث","قول النبي صلى الله عليه وسلم","islamic"),
("خليفة","من تولى أمر المسلمين بعد النبي","islamic"),
("صحابي","من لقي النبي مؤمنا به ومات على ذلك","islamic"),
# --- history ---
("فرعون","ملك مصر القديم الذي غرق في البحر","history"),
("روما","عاصمة الإمبراطورية الرومانية القديمة","history"),
("بغداد","عاصمة العراق وبنيت في العصر العباسي","history"),
("أندلس","بلاد حكمها المسلمون في أوروبا قرونا","history"),
("عثماني","نسبة إلى دولة حكمت بلادا كثيرة قرونا","history"),
("قلعة","حصن قديم يبنى للدفاع عن المدينة","history"),
("سيف","سلاح قديم يقطع به المحارب","history"),
("درع","ما يلبس للحماية في الحرب","history"),
("حصن","بناء محصن للدفاع عن المدينة","history"),
("أهرام","مقابر ملوك مصر القديمة في الجيزة","history"),
("نقش","كتابة أو رسم على الحجر في العصور القديمة","history"),
("آثار","بقايا الحضارات القديمة","history"),
("متحف","مكان تحفظ فيه الآثار القديمة","history"),
("حضارة","تقدم شعب في العلم والعمران","history"),
("إمبراطور","لقب حاكم الإمبراطورية الرومانية","history"),
("قيصر","لقب ملوك الروم قديما","history"),
("كسري","لقب ملوك الفرس قديما","history"),
("غزوة","معركة شارك فيها النبي صلى الله عليه وسلم","history"),
# --- geography ---
("مصر","دولة عربية يجري فيها نهر النيل","geography"),
("سوريا","دولة عربية عاصمتها دمشق","geography"),
("لبنان","دولة عربية عاصمتها بيروت","geography"),
("الجزائر","أكبر دولة عربية من حيث المساحة","geography"),
("تونس","دولة عربية عاصمتها تونس","geography"),
("المغرب","دولة عربية عاصمتها الرباط","geography"),
("عمان","دولة عربية عاصمتها مسقط","geography"),
("قطر","دولة عربية عاصمتها الدوحة","geography"),
("اليمن","دولة عربية عاصمتها صنعاء","geography"),
("السودان","دولة عربية عاصمتها الخرطوم","geography"),
("ليبيا","دولة عربية عاصمتها طرابلس","geography"),
("الأردن","دولة عربية عاصمتها عمان","geography"),
("العراق","دولة عربية عاصمتها بغداد","geography"),
("الكويت","دولة عربية عاصمتها مدينة الكويت","geography"),
("البحرين","دولة جزيرة في الخليج العربي","geography"),
("دمشق","عاصمة سوريا","geography"),
("بيروت","عاصمة لبنان","geography"),
("الرباط","عاصمة المغرب","geography"),
("مسقط","عاصمة عمان","geography"),
("الدوحة","عاصمة قطر","geography"),
("صنعاء","عاصمة اليمن","geography"),
("الخرطوم","عاصمة السودان","geography"),
("طرابلس","عاصمة ليبيا","geography"),
("نيل","أطول أنهار العالم ويمر بمصر","geography"),
("صحراء","أرض رملية جافة واسعة","geography"),
("محيط","مسطح مائي واسع يحيط بالقارات","geography"),
("جزيرة","أرض تحيط بها المياه من كل الجهات","geography"),
("أطلس","جبال تقع في المغرب","geography"),
# --- science ---
("ذرة","أصغر وحدة في المادة","science"),
("خلية","أصغر وحدة في جسم الكائن الحي","science"),
("جاذبية","قوة تجذب الأجسام نحو الأرض","science"),
("كهرباء","طاقة تشغل الأجهزة والأنوار","science"),
("مغناطيس","معدن يجذب الحديد إليه","science"),
("بخار","ماء يتحول إلى غاز بالحرارة","science"),
("بركان","جبل يقذف الحمم الملتهبة","science"),
("زلزال","اهتزاز يحدث في باطن الأرض","science"),
("قمر","جرم سماوي يدور حول الأرض","science"),
("شمس","نجم يضيء النهار","science"),
("نجم","جرم سماوي يلمع في السماء ليلا","science"),
("كوكب","جرم يدور حول الشمس","science"),
("مريخ","كوكب أحمر اللون","science"),
("زهرة","كوكب قريب من الشمس","science"),
("عطارد","أقرب الكواكب إلى الشمس","science"),
("زحل","كوكب تحيط به حلقات","science"),
("مختبر","مكان تجرى فيه التجارب العلمية","science"),
("تجربة","اختبار علمي لإثبات فكرة","science"),
("حرارة","مقياس سخونة الأجسام","science"),
("ضوء","ما يجعلنا نرى الأشياء","science"),
("صوت","ما نسمعه بأذننا","science"),
# --- animals / plants ---
("أسد","ملك الغابة وحيوان مفترس","animals"),
("نمر","حيوان مفترس مخطط الجسم","animals"),
("فيل","حيوان ضخم له خرطوم طويل","animals"),
("زرافة","حيوان طويل الرقبة","animals"),
("جمل","سفينة الصحراء","animals"),
("حصان","حيوان يركبه الإنسان ويجري بسرعة","animals"),
("ذئب","حيوان مفترس يعوي ليلا","animals"),
("ثعلب","حيوان معروف بالمكر","animals"),
("أرنب","حيوان صغير طويل الأذنين","animals"),
("قرد","حيوان يتسلق الأشجار","animals"),
("نخلة","شجرة تنتج التمر","animals"),
("وردة","زهرة جميلة ذات رائحة طيبة","animals"),
("تفاح","فاكهة حمراء أو خضراء","animals"),
("موز","فاكهة صفراء طويلة","animals"),
("عنب","فاكهة تنمو في عناقيد","animals"),
("تين","فاكهة ذكرت في القرآن الكريم","animals"),
("زيتون","شجرة مباركة تنتج الزيت","animals"),
("قمح","نبات يصنع منه الخبز","animals"),
("أرز","طعام يزرع في حقول مغمورة بالماء","animals"),
("بطيخ","فاكهة كبيرة خضراء من الخارج حمراء من الداخل","animals"),
("ليمون","فاكهة صفراء حامضة","animals"),
# --- sports ---
("كرة","جسم مستدير يلعب به في الملاعب","sports"),
("هدف","ما يسجله اللاعب في مرمى الخصم","sports"),
("ملعب","مكان تقام فيه المباريات","sports"),
("حكم","من يدير المباراة ويطبق القوانين","sports"),
("سباق","منافسة في الجري بين المتسابقين","sports"),
("سباحة","رياضة تمارس في الماء","sports"),
("ملاكمة","رياضة قتالية تلبس فيها القفازات","sports"),
("جودو","رياضة قتالية يابانية الأصل","sports"),
("تنس","رياضة تلعب بالمضرب والكرة الصغيرة","sports"),
("شطرنج","لعبة ذهنية تلعب على رقعة مربعات","sports"),
("ميدالية","جائزة معدنية تعطى للفائزين","sports"),
("بطولة","مسابقة كبيرة بين الفرق أو اللاعبين","sports"),
("فريق","مجموعة لاعبين يلعبون معا","sports"),
("مدرب","من يدرب الفريق ويضع خطته","sports"),
("مرمى","ما يسدد اللاعب الكرة نحوه ليسجل","sports"),
("جمهور","من يشاهد المباراة ويشجع فريقه","sports"),
# --- arabic language ---
("فعل","كلمة تدل على حدث في زمن معين","language"),
("اسم","كلمة تدل على شيء أو شخص","language"),
("حرف","كلمة لا معنى لها وحدها مثل في وعلى","language"),
("جمع","ما دل على أكثر من اثنين","language"),
("مفرد","ما دل على واحد فقط","language"),
("ضمير","كلمة تحل محل الاسم مثل هو وهي","language"),
("مبتدأ","اسم يبدأ به الكلام في الجملة الاسمية","language"),
("خبر","ما يتمم معنى المبتدأ في الجملة","language"),
("فاعل","من قام بالفعل في الجملة","language"),
("مفعول","من وقع عليه الفعل","language"),
("صفة","كلمة تصف الاسم وتبين حاله","language"),
("ظرف","كلمة تدل على الزمان أو المكان","language"),
("نحو","علم يهتم بقواعد اللغة العربية","language"),
("صرف","علم يهتم ببنية الكلمة العربية","language"),
("بلاغة","علم حسن الكلام وفصاحته","language"),
("شعر","كلام موزون مقفى","language"),
("نثر","كلام غير موزون","language"),
# --- historical figures ---
("صلاح","قائد مسلم حرر القدس من الصليبيين","figures"),
("خالد","قائد مسلم لقب بسيف الله المسلول","figures"),
("عمر","ثاني الخلفاء الراشدين","figures"),
("علي","رابع الخلفاء الراشدين","figures"),
("عثمان","ثالث الخلفاء الراشدين","figures"),
("حمزة","عم النبي ولقب بأسد الله","figures"),
("بلال","مؤذن النبي صلى الله عليه وسلم","figures"),
("طارق","قائد فتح الأندلس","figures"),
("موسى","نبي كلم الله سبحانه","figures"),
("إبراهيم","نبي بنى الكعبة مع ابنه إسماعيل","figures"),
("يوسف","نبي رأى أحد عشر كوكبا في المنام","figures"),
("يونس","نبي ابتلعه الحوت","figures"),
("أيوب","نبي اشتهر بالصبر على البلاء","figures"),
("زكريا","نبي والد يحيى عليهما السلام","figures"),
("داود","نبي آتاه الله الزبور","figures"),
("سليمان","نبي آتاه الله ملكا عظيما","figures"),
# --- general ---
("بحر","مسطح مائي مالح واسع","general"),
("جبل","مرتفع كبير من الأرض","general"),
("نهر","مجرى ماء عذب يجري على الأرض","general"),
("غابة","أرض كثيرة الأشجار","general"),
("سحاب","بخار ماء متجمع في السماء","general"),
("مطر","ماء ينزل من السماء","general"),
("رعد","صوت يصاحب البرق في العاصفة","general"),
("برق","ضوء يلمع في السماء أثناء العاصفة","general"),
("ثلج","ماء متجمد يتساقط شتاء","general"),
("رياح","هواء يتحرك في الجو","general"),
("فجر","أول النهار قبل شروق الشمس","general"),
("غروب","وقت اختفاء الشمس في المساء","general"),
("ليل","وقت الظلام بعد غروب الشمس","general"),
("صباح","أول النهار بعد الفجر","general"),
("قلم","أداة نكتب بها","general"),
("كتاب","مجموعة أوراق فيها علم أو قصة","general"),
("مدرسة","مكان يتعلم فيه التلاميذ","general"),
("معلم","من يعلم التلاميذ في المدرسة","general"),
# --- riddles ---
("لغز","سؤال صعب يحتاج إلى تفكير","riddles"),
("سر","شيء مخفي لا يعرفه الناس","riddles"),
("كنز","مال مدفون يبحث عنه الناس","riddles"),
("مفتاح","أداة تفتح الأبواب","riddles"),
("قفل","أداة تغلق الأبواب","riddles"),
("مرآة","سطح يعكس صورة من يقف أمامه","riddles"),
("ظل","خيال الجسم في ضوء الشمس","riddles"),
("صدى","صوت يرتد من الجدار أو الجبل","riddles"),
("حلم","ما يراه النائم في منامه","riddles"),
("وهم","ما يتصوره الإنسان وليس حقيقيا","riddles"),
("نوم","راحة الجسم والعينين ليلا","riddles"),
("يقظة","ضد النوم","riddles"),
]

CATS = ["islamic","history","geography","science","animals","sports",
        "language","figures","general","riddles"]
DIFFS = ["beginner","intermediate","advanced","expert"]
LEN_RANGE = {"beginner":(3,5),"intermediate":(3,6),"advanced":(4,7),"expert":(4,8)}
GRID = 9

def can_place(grid, word, r, c, dr, dc):
    n = len(word)
    if not (0 <= r < GRID and 0 <= c < GRID):
        return False
    er, ec = r + dr*(n-1), c + dc*(n-1)
    if not (0 <= er < GRID and 0 <= ec < GRID):
        return False
    # cell before start and after end must be empty / out of bounds
    br, bc = r-dr, c-dc
    if 0 <= br < GRID and 0 <= bc < GRID and grid[br][bc] is not None:
        return False
    ar, ac = er+dr, ec+dc
    if 0 <= ar < GRID and 0 <= ac < GRID and grid[ar][ac] is not None:
        return False
    crossed = 0
    for i, ch in enumerate(word):
        rr, cc = r+dr*i, c+dc*i
        cur = grid[rr][cc]
        if cur is not None:
            if cur != ch:
                return False
            crossed += 1
        else:
            # orthogonal neighbours must be empty (avoid accidental words)
            if dr == 0:  # horizontal: check up/down
                for nr, nc in ((rr-1,cc),(rr+1,cc)):
                    if 0 <= nr < GRID and 0 <= nc < GRID and grid[nr][nc] is not None:
                        return False
            else:  # vertical: check left/right
                for nr, nc in ((rr,cc-1),(rr,cc+1)):
                    if 0 <= nr < GRID and 0 <= nc < GRID and grid[nr][nc] is not None:
                        return False
    return True

def place(grid, word, r, c, dr, dc):
    cells = []
    for i, ch in enumerate(word):
        rr, cc = r+dr*i, c+dc*i
        if grid[rr][cc] is None:
            grid[rr][cc] = ch
            cells.append((rr,cc))
    return cells

def build_puzzle(rng, words, target):
    for _attempt in range(400):
        grid = [[None]*GRID for _ in range(GRID)]
        placed = []  # (word, clue, r, c, dir)
        order = words[:]
        rng.shuffle(order)
        # first word horizontal in middle
        w0 = order[0]
        r0 = GRID//2
        c0 = (GRID - len(w0[0]))//2
        place(grid, w0[0], r0, c0, 0, 1)
        placed.append((w0, r0, c0, 'h'))
        for w in order[1:]:
            if len(placed) >= target:
                break
            word, clue, cat = w
            cands = []
            for (pw, pr, pc, pdir) in placed:
                pword = pw[0]
                for i, ch in enumerate(word):
                    for j, pch in enumerate(pword):
                        if ch != pch:
                            continue
                        if pdir == 'h':
                            # existing word horizontal at (pr, pc+j); new vertical crossing there
                            r = pr - i; c = pc + j
                            if can_place(grid, word, r, c, 1, 0):
                                cands.append((r, c, 1, 0))
                        else:
                            r = pr + j; c = pc - i
                            if can_place(grid, word, r, c, 0, 1):
                                cands.append((r, c, 0, 1))
            if not cands:
                continue
            r, c, dr, dc = rng.choice(cands)
            place(grid, word, r, c, dr, dc)
            placed.append((w, r, c, 'v' if dr == 1 else 'h'))
        if len(placed) < target:
            continue
        # every word must intersect another: check shared cells
        occ = {}
        ok = True
        for idx, (w, r, c, d) in enumerate(placed):
            word = w[0]
            shared = False
            for i in range(len(word)):
                rr = r + (1 if d == 'v' else 0)*i
                cc = c + (1 if d == 'h' else 0)*i
                for jdx, (w2, r2, c2, d2) in enumerate(placed):
                    if jdx == idx:
                        continue
                    word2 = w2[0]
                    for k in range(len(word2)):
                        if (r2 + (1 if d2 == 'v' else 0)*k, c2 + (1 if d2 == 'h' else 0)*k) == (rr, cc):
                            shared = True
            if not shared:
                ok = False
                break
        if not ok:
            continue
        return grid, placed
    return None, None

def main():
    seed = int(sys.argv[1]) if len(sys.argv) > 1 else 42
    rng = random.Random(seed)
    # pool per category, shuffled, no reuse across puzzles
    pools = {cat: [w for w in BANK if w[2] == cat] for cat in CATS}
    for cat in pools:
        rng.shuffle(pools[cat])
    puzzles = []
    # 6 puzzles per difficulty; target 6 words for 16 puzzles, 5 for 8 => 136
    specs = []
    for di, diff in enumerate(DIFFS):
        for i in range(6):
            specs.append((diff, 6 if (di*6+i) % 3 != 2 else 5))
    # category assignment round-robin so all 10 categories appear
    cat_cycle = []
    for i in range(24):
        cat_cycle.append(CATS[i % len(CATS)])
    rng.shuffle(cat_cycle)
    prefixes = {"beginner":"b","intermediate":"m","advanced":"a","expert":"e"}
    used_answers = set()
    for idx, ((diff, target), cat) in enumerate(zip(specs, cat_cycle)):
        lo, hi = LEN_RANGE[diff]
        # candidate words from this category, unused, length in range
        cands = [w for w in pools[cat] if w[0] not in used_answers and lo <= len(w[0]) <= hi]
        # if not enough, allow other categories' words (puzzle keeps main category)
        if len(cands) < target + 2:
            extra = [w for w in BANK if w[0] not in used_answers and lo <= len(w[0]) <= hi and w not in cands]
            rng.shuffle(extra)
            cands = cands + extra
        grid, placed = build_puzzle(rng, cands, target)
        if grid is None:
            print(f"FAILED puzzle {idx} diff={diff} cat={cat}")
            sys.exit(1)
        for (w, r, c, d) in placed:
            used_answers.add(w[0])
        # numbering: cells that start a word, row-major
        starts = {}
        n = 1
        for r in range(GRID):
            for c in range(GRID):
                is_start = any(rr == r and cc == c for (_, rr, cc, _) in placed)
                if is_start:
                    starts[(r, c)] = n
                    n += 1
        words_out = []
        for (w, r, c, d) in placed:
            words_out.append({"answer": w[0], "clue": w[1], "row": r, "col": c,
                              "dir": d, "num": starts[(r, c)]})
        grid_out = ["".join(ch if ch is not None else "#" for ch in row) for row in grid]
        pid = f"{prefixes[diff]}{idx % 6 + 1}"
        puzzles.append({"id": pid, "difficulty": diff, "category": cat,
                        "title": f"{pid}", "rows": GRID, "cols": GRID,
                        "grid": grid_out, "words": words_out})
    total_words = sum(len(p["words"]) for p in puzzles)
    print(f"puzzles={len(puzzles)} words={total_words}")
    print("per difficulty:", {d: sum(1 for p in puzzles if p['difficulty']==d) for d in DIFFS})
    print("per category:", {c: sum(1 for p in puzzles if p['category']==c) for c in CATS})
    out = {"version": 1, "puzzles": puzzles}
    here = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(here, "..", "web", "levels.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print("wrote", path)

if __name__ == "__main__":
    main()
