import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext(null);

const dict = {
  en: {
    'nav.home': 'Home',
    'nav.collection': 'Collection',
    'nav.craft': 'The craft',
    'nav.contact': 'Contact',
    'nav.order': 'Order now',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.lang': 'አማ',

    'hero.eyebrow': 'Addis Ababa · Nationwide delivery',
    'hero.title1': 'Water, held to a',
    'hero.title2': 'higher standard.',
    'hero.lede':
      'Fiber and plastic tanks engineered in Addis Ababa — from 200 litres for a home to 25,000 for a factory. Anti-bacterial interiors, UV-stable shells, and a written ten-year warranty.',
    'hero.explore': 'Explore the collection',
    'hero.talk': 'Talk to a specialist',
    'hero.scroll': 'Scroll to explore',
    'hero.card1.title': 'Anti-bacterial',
    'hero.card1.text': 'Food-grade inner layer',
    'hero.card2.title': '10-year warranty',
    'hero.card2.text': 'In writing, not in passing',

    'marquee.1': '10-year written warranty',
    'marquee.2': 'Food-grade & anti-bacterial',
    'marquee.3': 'Free city installation',
    'marquee.4': 'Nationwide delivery',
    'marquee.5': '200 – 25,000 litres',
    'marquee.6': 'Fiber & plastic',

    'coll.eyebrow': '01 — The collection',
    'coll.title': 'Four lines. One standard.',
    'coll.lede':
      'Every tank we make shares the same discipline: honest materials, measured wall thickness, and a finish you can run your hand across.',
    'coll.view': 'View line',

    'prod.eyebrow': '02 — Signature models',
    'prod.title': 'The ones people ask for.',
    'prod.lede':
      'Stocked sizes leave our yard within 48 hours in Addis Ababa. Anything larger is built to order, measured on site.',
    'prod.all': 'View all products',
    'prod.from': 'from',
    'prod.quote': 'Price on request',
    'prod.configure': 'Configure',
    'prod.details': 'Details',
    'prod.instock': 'In stock',
    'prod.madeorder': 'Built to order',

    'craft.eyebrow': '03 — The craft',
    'craft.title': 'Built to outlast the weather.',
    'craft.lede':
      'We have spent years refining a single object: a tank that survives an Ethiopian roof — the sun, the dust, the cold nights, and everything between.',
    'craft.s1.title': 'Materials',
    'craft.s1.text':
      'Food-grade resin and virgin polymer only. No regrind in the water-contact layer, ever.',
    'craft.s2.title': 'Winding & moulding',
    'craft.s2.text':
      'Continuous filament winding and controlled cure give a wall without weak seams.',
    'craft.s3.title': 'Pressure testing',
    'craft.s3.text':
      'Every shell is filled and held before it leaves the yard. Nothing ships on trust.',
    'craft.s4.title': 'Delivery & install',
    'craft.s4.text':
      'Our own trucks and installers set the tank, level the base and commission the outlet.',
    'craft.quote':
      '“A tank should be the last thing you think about in a house.”',
    'craft.quoteBy': 'Meka workshop, Lideta',

    'why.eyebrow': '04 — Why Meka',
    'why.title': 'Quietly engineered.',
    'why.f1.title': 'Ten years, in writing',
    'why.f1.text':
      'A written warranty on every fiber and plastic tank — handled directly by our team, not a third party.',
    'why.f2.title': 'Water stays water',
    'why.f2.text':
      'Anti-bacterial, food-grade interiors keep taste and clarity intact from fill to tap.',
    'why.f3.title': 'Moves on our trucks',
    'why.f3.text':
      'Addis Ababa and nearby towns within 48 hours. Regional routes quoted honestly, per trip.',
    'why.f4.title': 'Installed, not dropped',
    'why.f4.text':
      'Levelled base, sealed inlet, brass outlet, tested. You turn the tap, not a wrench.',

    'test.eyebrow': '05 — Customers',
    'test.title': 'Words from the compound.',
    'test.lede': 'Five thousand installations, and the referrals still do our advertising.',

    'partners.eyebrow': 'In good company',

    'faq.eyebrow': '06 — Questions',
    'faq.title': 'Answers, before you ask.',
    'faq.lede': 'Still unsure? Call us — a person answers, not a menu.',

    'cta.title': 'Ready when you are.',
    'cta.lede':
      'Tell us the capacity and the address. We will confirm stock, price and a delivery window — usually within the hour.',
    'cta.call': 'Call the workshop',
    'cta.form': 'Send a message',

    'footer.about':
      'Manufacturer and distributor of fiber and plastic water tanks, underground reservoirs and fiber planters. Made in Addis Ababa since day one.',
    'footer.explore': 'Explore',
    'footer.contact': 'Contact',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterText': 'New sizes, restocks and workshop notes. Rarely, and never noise.',
    'footer.emailPlaceholder': 'your@email.com',
    'footer.subscribe': 'Subscribe',
    'footer.subscribed': 'Thank you — you are on the list.',
    'footer.rights': 'All rights reserved.',
    'footer.made': 'Manufactured in Addis Ababa',

    'page.collection.eyebrow': 'The collection',
    'page.collection.title': 'Tanks and planters, measured honestly.',
    'page.collection.lede':
      'Filter by line, compare capacities, and configure the one that fits your site.',
    'page.collection.search': 'Search by name or capacity',
    'page.collection.all': 'All lines',
    'page.collection.count': 'models',
    'page.collection.empty': 'Nothing matches that search yet.',
    'page.collection.reset': 'Clear filters',

    'page.craft.eyebrow': 'The craft',
    'page.craft.title': 'A workshop, not a warehouse.',
    'page.craft.lede':
      'Meka began with fiber, water and a stubborn idea: that a locally made tank could outlast an imported one. Everything since has been refinement.',
    'page.craft.storyTitle': 'How we got here',
    'page.craft.story':
      'Our yard in Lideta runs on two shifts. Resin arrives, is wound and cured, then every shell is filled, held and inspected before it is allowed onto a truck. The people who build the tank are often the people who install it — which is exactly why the details are right.',
    'page.craft.story2':
      'Today the workshop supplies homes, guest houses, farms and factories across the country, and the flower-pot line keeps the same standard in a smaller object.',
    'page.craft.values': 'What we hold to',

    'page.contact.eyebrow': 'Contact',
    'page.contact.title': 'Let us talk water.',
    'page.contact.lede':
      'Orders, site surveys, custom underground builds, or a question about the tank you already own — reach us directly.',
    'page.contact.call': 'Call',
    'page.contact.email': 'Email',
    'page.contact.visit': 'Visit',
    'page.contact.hours': 'Hours',
    'page.contact.formTitle': 'Send a message',
    'page.contact.formText': 'We reply within one working day, usually much sooner.',
    'page.contact.name': 'Full name',
    'page.contact.phone': 'Phone',
    'page.contact.emailField': 'Email',
    'page.contact.subject': 'Subject',
    'page.contact.message': 'Message',
    'page.contact.send': 'Send message',
    'page.contact.sending': 'Sending…',
    'page.contact.success': 'Message received. We will be in touch shortly.',
    'page.contact.another': 'Send another message',
    'page.contact.hoursValue': 'Mon – Sat · 8:00 AM – 6:00 PM',
    'page.contact.whatsapp': 'Chat on Telegram',

    'order.title': 'Place an order',
    'order.lede': 'We confirm stock and delivery by phone before anything is charged.',
    'order.product': 'Model',
    'order.productPlaceholder': 'Select a model',
    'order.quantity': 'Quantity',
    'order.name': 'Full name',
    'order.phone': 'Phone number',
    'order.email': 'Email (optional)',
    'order.address': 'Delivery address',
    'order.notes': 'Notes (optional)',
    'order.notesPlaceholder': 'Roof access, preferred day, site details…',
    'order.submit': 'Request order',
    'order.submitting': 'Sending…',
    'order.successTitle': 'Order request received.',
    'order.successText': 'Our team will call you shortly to confirm stock and a delivery window.',
    'order.reference': 'Your reference',
    'order.close': 'Close',
    'order.required': 'Required',
    'order.err': 'Please complete the required fields.',

    'prodpage.back': 'Back to collection',
    'prodpage.specs': 'Specifications',
    'prodpage.capacity': 'Capacity',
    'prodpage.category': 'Line',
    'prodpage.warranty': 'Warranty',
    'prodpage.warrantyValue': '10 years, written',
    'prodpage.availability': 'Availability',
    'prodpage.install': 'Installation',
    'prodpage.installValue': 'Included in Addis Ababa',
    'prodpage.features': 'What you get',
    'prodpage.related': 'Others in this line',
    'prodpage.order': 'Order this model',
    'prodpage.ask': 'Ask about this model',
    'prodpage.needHelp': 'Need a size that is not listed? We build to measure.',
    'prodpage.needHelpCta': 'Request a custom build',
    'prodpage.notFound': 'That model is no longer listed.',
    'common.loading': 'Loading',
    'common.currency': 'ETB',
    'common.litres': 'litres',
  },
  am: {
    'nav.home': 'ዋና ገፅ',
    'nav.collection': 'ምርቶች',
    'nav.craft': 'ስራችን',
    'nav.contact': 'አግኙን',
    'nav.order': 'አሁኑኑ ይዘዙ',
    'nav.menu': 'ማውጫ',
    'nav.close': 'ዝጋ',
    'nav.lang': 'EN',

    'hero.eyebrow': 'አዲስ አበባ · በሀገር አቀፍ አቅርቦት',
    'hero.title1': 'ውሀ፣ በከፍተኛ ደረጃ',
    'hero.title2': 'የተጠበቀ።',
    'hero.lede':
      'በአዲስ አበባ የሚመረቱ የፋይበር እና የፕላስቲክ ታንከሮች — ከ200 ሊትር ለቤት እስከ 25,000 ሊትር ለፋብሪካ። ፀረ-ባክቴሪያ፣ ለፀሐይ የማይበገር እና የ10 አመት የፃፍ ዋስትና።',
    'hero.explore': 'ምርቶቻችንን ይመልከቱ',
    'hero.talk': 'ከባለሙያ ጋር ይነጋገሩ',
    'hero.scroll': 'ወደ ታች ይሸብልሉ',
    'hero.card1.title': 'ፀረ-ባክቴሪያ',
    'hero.card1.text': 'ለምግብ ተስማሚ የውስጥ ንብርብር',
    'hero.card2.title': 'የ10 አመት ዋስትና',
    'hero.card2.text': 'በፅሁፍ የተረጋገጠ',

    'marquee.1': 'የ10 አመት የፃፍ ዋስትና',
    'marquee.2': 'ለምግብ ተስማሚ እና ፀረ-ባክቴሪያ',
    'marquee.3': 'በከተማ ውስጥ ነፃ ገጠማ',
    'marquee.4': 'በሀገር አቀፍ አቅርቦት',
    'marquee.5': 'ከ200 – 25,000 ሊትር',
    'marquee.6': 'ፋይበር እና ፕላስቲክ',

    'coll.eyebrow': '01 — ምርቶች',
    'coll.title': 'አራት መስመሮች። አንድ መስፈርት።',
    'coll.lede':
      'ሁሉም ታንከሮቻችን አንድ ዓይነት ጥንቃቄ አላቸው፤ ንፁህ ግብአት፣ የተለካ ውፍረት እና በእጅ ሲነካ የሚታወቅ ጥራት።',
    'coll.view': 'መስመሩን ይመልከቱ',

    'prod.eyebrow': '02 — ተመራጭ ሞዴሎች',
    'prod.title': 'በብዛት የሚፈለጉት።',
    'prod.lede':
      'በመጋዘን ያሉ መጠኖች በአዲስ አበባ በ48 ሰዓት ውስጥ ይደርሳሉ። ትልቁ በልዩ ትዕዛዝ በቦታው ተለክቶ ይሰራል።',
    'prod.all': 'ሁሉንም ምርቶች ይመልከቱ',
    'prod.from': 'ከ',
    'prod.quote': 'ዋጋ በጥያቄ',
    'prod.configure': 'ያዘዙ',
    'prod.details': 'ዝርዝር',
    'prod.instock': 'በመጋዘን አለ',
    'prod.madeorder': 'በትዕዛዝ የሚሰራ',

    'craft.eyebrow': '03 — ስራችን',
    'craft.title': 'ለረጅም ጊዜ እንዲቆይ የተሰራ።',
    'craft.lede':
      'ለዓመታት ያሳለፍነው ጊዜ አንድ ነገር ላይ ነው፡ ፀሐይን፣ ሙቀትን እና ቅዝቃዜን የሚቋቋም ታንከር።',
    'craft.s1.title': 'ግብአት',
    'craft.s1.text': 'ለምግብ ተስማሚ ሬዚን እና ንፁህ ፖሊመር ብቻ። በውሀ ንብርብር ላይ ጥሬ ቁሳቁስ አይገባም።',
    'craft.s2.title': 'ሽያጥ እና ቅርፅ',
    'craft.s2.text': 'ቀጣይ የፋይበር ሽያጥ እና ቁጥጥር የሚደረግበት ማድረቅ ያለስንጥቅ ግድግዳ ይሰጣል።',
    'craft.s3.title': 'የግፊት ምርመራ',
    'craft.s3.text': 'እያንዳንዱ ታንከር ከመውጣቱ በፊት ተሞልቶ ይረጋገጣል።',
    'craft.s4.title': 'አቅርቦት እና ገጠማ',
    'craft.s4.text': 'በራሳችን ተሽከርካሪ እና ባለሙያ ተገጥሞ፣ መሰረቱ ተስተካክሎ ይረከባል።',
    'craft.quote': '“ታንከር በቤት ውስጥ መጨረሻ የሚያስቡት ነገር መሆን አለበት።”',
    'craft.quoteBy': 'የመካ ወርክሾፕ፣ ልደታ',

    'why.eyebrow': '04 — ለምን መካ',
    'why.title': 'በጥንቃቄ የተሰራ።',
    'why.f1.title': 'አስር አመት፣ በፅሁፍ',
    'why.f1.text': 'ለሁሉም ታንከሮች የፃፍ ዋስትና — በቀጥታ በቡድናችን የሚያስተናገድ።',
    'why.f2.title': 'ውሀው ውሀ ሆኖ ይቆያል',
    'why.f2.text': 'ፀረ-ባክቴሪያ የውስጥ ንብርብር ጣዕሙን እና ግልፅነቱን ይጠብቃል።',
    'why.f3.title': 'በራሳችን ተሽከርካሪ',
    'why.f3.text': 'አዲስ አበባ እና አካባቢዋ በ48 ሰዓት። ለክልል በመስመር ተለክቶ ይቀርባል።',
    'why.f4.title': 'የተገጠመ፣ የተጣለ አይደለም',
    'why.f4.text': 'የተስተካከለ መሰረት፣ የተዘጋ ማስገቢያ፣ የነሀስ መውጫ። እርስዎ ቧንቧውን ይከፍታሉ።',

    'test.eyebrow': '05 — ደንበኞች',
    'test.title': 'የደንበኞቻችን ቃል።',
    'test.lede': 'አምስት ሺህ ገጠማ — እስከ ዛሬ ማስታወቂያችን የደንበኞች ቃል ነው።',

    'partners.eyebrow': 'አጋሮቻችን',

    'faq.eyebrow': '06 — ጥያቄዎች',
    'faq.title': 'ከመጠየቅዎ በፊት መልስ።',
    'faq.lede': 'አሁንም ጥያቄ ካለዎት ይደውሉልን — ሰው ይመልስልዎታል።',

    'cta.title': 'ዝግጁ ሲሆኑ።',
    'cta.lede': 'መጠኑን እና አድራሻውን ይንገሩን። ክምችት፣ ዋጋ እና የአቅርቦት ጊዜ በአንድ ሰዓት ውስጥ እናረጋግጣለን።',
    'cta.call': 'ወርክሾፉን ይደውሉ',
    'cta.form': 'መልዕክት ይላኩ',

    'footer.about':
      'የፋይበር እና የፕላስቲክ የውሀ ታንከሮች፣ የመሬት ውስጥ ማጠራቀሚያዎች እና የአበባ ማስቀመጫዎች አምራች እና አከፋፋይ። በአዲስ አበባ የተመረተ።',
    'footer.explore': 'ያስሱ',
    'footer.contact': 'አግኙን',
    'footer.newsletter': 'ጋዜጣ',
    'footer.newsletterText': 'አዲስ መጠኖች እና የወርክሾፕ መረጃ። ብዙ አይደለም።',
    'footer.emailPlaceholder': 'ኢሜልዎ',
    'footer.subscribe': 'ሰብስክራይብ',
    'footer.subscribed': 'አመሰግናለን — ተመዝግበዋል።',
    'footer.rights': 'መብቱ በህግ የተጠበቀ ነው።',
    'footer.made': 'በአዲስ አበባ የተመረተ',

    'page.collection.eyebrow': 'ምርቶች',
    'page.collection.title': 'ታንከሮች እና ማስቀመጫዎች፣ በትክክል የተለኩ።',
    'page.collection.lede': 'በመስመር ያጣሩ፣ አቅም ያነፃፅሩ እና ለቦታዎ የሚስማማውን ይምረጡ።',
    'page.collection.search': 'በስም ወይም በአቅም ይፈልጉ',
    'page.collection.all': 'ሁሉም መስመሮች',
    'page.collection.count': 'ሞዴሎች',
    'page.collection.empty': 'ከፍለጋው ጋር የሚስማማ ምርት አልተገኘም።',
    'page.collection.reset': 'ፍለጋውን አጽዳ',

    'page.craft.eyebrow': 'ስራችን',
    'page.craft.title': 'ወርክሾፕ ነው፣ መጋዘን አይደለም።',
    'page.craft.lede':
      'መካ የተጀመረው በፋይበር፣ በውሀ እና በአንድ ሀሳብ ነው፡ በሀገር ውስጥ የተሰራ ታንከር ከውጭ ከሚመጣው ይሻላል።',
    'page.craft.storyTitle': 'እንዴት እስከዚህ ደረስን',
    'page.craft.story':
      'በልደታ ያለው ወርክሾፋችን በሁለት ፈረቃ ይሰራል። ሬዚን ይመጣል፣ ይሽየጣል፣ ይደርቃል፤ ከዚያ እያንዳንዱ ታንከር ተሞልቶ ከመላኩ በፊት ይመረመራል። ታንከሩን የሚሰሩት ሰዎች ብዙ ጊዜ የሚገጥሙትም እነሱ ናቸው።',
    'page.craft.story2':
      'ዛሬ ወርክሾፋችን ቤቶችን፣ እንግዳ ማረፊያዎችን፣ እርሻዎችን እና ፋብሪካዎችን ያገለግላል። የአበባ ማስቀመጫ መስመራችንም ተመሳሳይ መስፈርት አለው።',
    'page.craft.values': 'የምንጠበቅባቸው',

    'page.contact.eyebrow': 'አግኙን',
    'page.contact.title': 'ስለ ውሀ እንነጋገር።',
    'page.contact.lede':
      'ትዕዛዝ፣ የቦታ ምርመራ፣ የመሬት ውስጥ ታንከር ግንባታ ወይም ስለ ኖረዎት ታንከር ጥያቄ — በቀጥታ ያግኙን።',
    'page.contact.call': 'ይደውሉ',
    'page.contact.email': 'ኢሜል',
    'page.contact.visit': 'ይጎብኙ',
    'page.contact.hours': 'የስራ ሰዓት',
    'page.contact.formTitle': 'መልዕክት ይላኩ',
    'page.contact.formText': 'በአንድ የስራ ቀን ውስጥ እንመልሳለን።',
    'page.contact.name': 'ሙሉ ስም',
    'page.contact.phone': 'ስልክ ቁጥር',
    'page.contact.emailField': 'ኢሜል',
    'page.contact.subject': 'ርዕስ',
    'page.contact.message': 'መልዕክት',
    'page.contact.send': 'መልዕክት ላክ',
    'page.contact.sending': 'በመላክ ላይ…',
    'page.contact.success': 'መልዕክትዎ ደርሶናል። በቅርቡ እናገኝዎታለን።',
    'page.contact.another': 'ሌላ መልዕክት ላክ',
    'page.contact.hoursValue': 'ሰኞ – ቅዳሜ · ከጠዋቱ 2:00 – ከሰዓት 12:00',
    'page.contact.whatsapp': 'በቴሌግራም ያግኙን',

    'order.title': 'ትዕዛዝ ያስገቡ',
    'order.lede': 'ከመክፈልዎ በፊት ክምችት እና አቅርቦትን በስልክ እናረጋግጣለን።',
    'order.product': 'ሞዴል',
    'order.productPlaceholder': 'ሞዴል ይምረጡ',
    'order.quantity': 'ብዛት',
    'order.name': 'ሙሉ ስም',
    'order.phone': 'ስልክ ቁጥር',
    'order.email': 'ኢሜል (አማራጭ)',
    'order.address': 'የማድረሻ አድራሻ',
    'order.notes': 'ማስታወሻ (አማራጭ)',
    'order.notesPlaceholder': 'የቦታው ሁኔታ፣ የሚመችዎ ቀን…',
    'order.submit': 'ትዕዛዝ ላክ',
    'order.submitting': 'በመላክ ላይ…',
    'order.successTitle': 'ትዕዛዝዎ ደርሶናል።',
    'order.successText': 'ቡድናችን ክምችት እና የአቅርቦት ጊዜን ለማረጋገጥ በቅርቡ ይደውልልዎታል።',
    'order.reference': 'ማጣቀሻ ቁጥር',
    'order.close': 'ዝጋ',
    'order.required': 'ያስፈልጋል',
    'order.err': 'እባክዎ አስፈላጊ መረጃዎችን ይሙሉ።',

    'prodpage.back': 'ወደ ምርቶች',
    'prodpage.specs': 'ዝርዝር መረጃ',
    'prodpage.capacity': 'አቅም',
    'prodpage.category': 'መስመር',
    'prodpage.warranty': 'ዋስትና',
    'prodpage.warrantyValue': '10 አመት፣ በፅሁፍ',
    'prodpage.availability': 'ክምችት',
    'prodpage.install': 'ገጠማ',
    'prodpage.installValue': 'በአዲስ አበባ ውስጥ ነፃ',
    'prodpage.features': 'የሚያገኙት',
    'prodpage.related': 'በዚሁ መስመር',
    'prodpage.order': 'ይህን ሞዴል ያዘዙ',
    'prodpage.ask': 'ስለዚህ ሞዴል ይጠይቁ',
    'prodpage.needHelp': 'የማይዘረዘረው መጠን ይፈልጋሉ? በልዩ ስፋት እንሰራለን።',
    'prodpage.needHelpCta': 'ልዩ ትዕዛዝ ይጠይቁ',
    'prodpage.notFound': 'ይህ ሞዴል ከአሁን በኋላ አልተዘረዘረም።',
    'common.loading': 'በመጫን ላይ',
    'common.currency': 'ብር',
    'common.litres': 'ሊትር',
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('meka_lang') === 'am' ? 'am' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.dataset.lang = lang;
    try {
      localStorage.setItem('meka_lang', lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((next) => setLangState(next === 'am' ? 'am' : 'en'), []);
  const toggle = useCallback(() => setLangState((prev) => (prev === 'en' ? 'am' : 'en')), []);

  const t = useCallback(
    (key) => dict[lang]?.[key] ?? dict.en[key] ?? key,
    [lang]
  );

  const pick = useCallback(
    (en, am) => (lang === 'am' ? am || en || '' : en || am || ''),
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, toggle, t, pick, isAm: lang === 'am' }),
    [lang, setLang, toggle, t, pick]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}

export function formatPrice(value, lang) {
  const number = Number(value) || 0;
  if (!number) return lang === 'am' ? 'ዋጋ በጥያቄ' : 'Price on request';
  const formatted = number.toLocaleString('en-US');
  return lang === 'am' ? `${formatted} ብር` : `ETB ${formatted}`;
}

export function formatCapacity(value, lang) {
  if (!value) return lang === 'am' ? 'በልዩ ስፋት' : 'Made to measure';
  return lang === 'am' ? `${Number(value).toLocaleString()} ሊትር` : `${Number(value).toLocaleString()} L`;
}
