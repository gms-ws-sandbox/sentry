# Generated by Django 3.1 on 2019-09-22 21:43

from django.db import migrations, models

from sentry.new_migrations.migrations import CheckedMigration


class Migration(CheckedMigration):

    dependencies = [
        ("bad_flow_add_column_with_notnull_default_app", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="testtable",
            name="field",
            field=models.IntegerField(default=0),
        ),
    ]
