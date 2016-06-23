import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or '\x8f\xfdPC\xd3\xbf\x85a\xa3\x0c\xf5_\x90\xb9-J%1k\x90\x14i\x03\x9f'

    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True
    DATABASE_URI = os.path.join(basedir, 'db', 'data-dev.sqlite')

class TestingConfig(Config):
    TESTING = True
    DATABASE_URI = os.path.join(basedir, 'db', 'data-test.sqlite')

class ProductionConfig(Config):
    DATABASE_URI = os.path.join(basedir, 'db', 'data.sqlite')


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
