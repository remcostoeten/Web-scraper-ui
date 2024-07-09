
import sqlite3

# Sample data
products = [
    {
        "_id": "1633443450",
        "DE": {
            "url": "https://www.amazon.de/dp/1633443450",
            "title": "Fantasy Flight Games L5R04 FFGL5R04, Verschieden",
            "img": "https://m.media-amazon.com/images/I/61GZ301dloL.jpg",
            "brand": "Fantasy Flight Games",
            "productType": "TABLETOP_GAME",
            "parentAsin": False,
            "category": "Toy",
            "category 2": "Hardcover",
            "category 2 short": "hardcover",
            "rating": "4.8 out of 5 stars",
            "ratings count": 7,
            "salesRanks": [
                {
                    "category": "PC & Video Games",
                    "rank": 58397
                },
                {
                    "category": "PC Games",
                    "rank": 6568
                }
            ],
            "dimensions": "28.26 x 21.91 x 1.91 cm; 249.48 g",
            "firstSeen": "13 Dec. 2018",
            "MPN": "L5R04",
            "firstSeenYear": 2018
        }
    }
]

# Function to create SQLite database and insert data
def create_database():
    conn = sqlite3.connect('products.db')
    c = conn.cursor()

    # Create table
    c.execute('''CREATE TABLE IF NOT EXISTS products
                 (_id TEXT PRIMARY KEY,
                 url TEXT,
                 title TEXT,
                 img TEXT,
                 brand TEXT,
                 productType TEXT,
                 parentAsin BOOLEAN,
                 category TEXT,
                 category2 TEXT,
                 category2_short TEXT,
                 rating TEXT,
                 ratings_count INTEGER,
                 dimensions TEXT,
                 firstSeen TEXT,
                 MPN TEXT,
                 firstSeenYear INTEGER)''')

    # Insert data into the table
    for product in products:
        _id = product['_id']
        de_info = product['DE']
        url = de_info.get('url', '')
        title = de_info.get('title', '')
        img = de_info.get('img', '')
        brand = de_info.get('brand', '')
        productType = de_info.get('productType', '')
        parentAsin = de_info.get('parentAsin', False)
        category = de_info.get('category', '')
        category2 = de_info.get('category 2', '')
        category2_short = de_info.get('category 2 short', '')
        rating = de_info.get('rating', '')
        ratings_count = de_info.get('ratings count', 0)
        dimensions = de_info.get('dimensions', '')
        firstSeen = de_info.get('firstSeen', '')
        MPN = de_info.get('MPN', '')
        firstSeenYear = de_info.get('firstSeenYear', 0)

        c.execute('''INSERT INTO products (_id, url, title, img, brand, productType, parentAsin, category,
                                           category2, category2_short, rating, ratings_count, dimensions,
                                           firstSeen, MPN, firstSeenYear)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                  (_id, url, title, img, brand, productType, parentAsin, category,
                   category2, category2_short, rating, ratings_count, dimensions,
                   firstSeen, MPN, firstSeenYear))

    # Commit changes and close connection
    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_database()
    print("Database 'products.db' created successfully.")
