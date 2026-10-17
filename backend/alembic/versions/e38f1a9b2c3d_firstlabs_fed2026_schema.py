"""FirstLabs FED-2026 Schema Migration

Revision ID: e38f1a9b2c3d
Revises: d27dad1b3669
Create Date: 2026-10-17 15:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'e38f1a9b2c3d'
down_revision: Union[str, None] = 'd27dad1b3669'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # 1. Add columns to questions
    with op.batch_alter_table('questions') as batch_op:
        batch_op.add_column(sa.Column('evidence_category', sa.String(length=64), server_default='Original practice question', nullable=True))
        batch_op.add_column(sa.Column('confidence_label', sa.String(length=32), server_default='Original Practice', nullable=True))
        batch_op.add_column(sa.Column('source_url', sa.String(length=512), nullable=True))
        batch_op.add_column(sa.Column('source_title', sa.String(length=256), nullable=True))
        batch_op.add_column(sa.Column('question_type', sa.String(length=32), server_default='mcq', nullable=True))

    # 2. Add columns to coding_problems
    with op.batch_alter_table('coding_problems') as batch_op:
        batch_op.add_column(sa.Column('starter_code_javascript', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('starter_code_sql', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('test_cases', sa.JSON(), nullable=True))
        batch_op.add_column(sa.Column('sample_data', sa.JSON(), nullable=True))
        batch_op.add_column(sa.Column('hints', sa.JSON(), nullable=True))
        batch_op.add_column(sa.Column('evidence_category', sa.String(length=64), server_default='Original practice question', nullable=True))
        batch_op.add_column(sa.Column('confidence_label', sa.String(length=32), server_default='Original Practice', nullable=True))

    # 3. Add columns to learners
    with op.batch_alter_table('learners') as batch_op:
        batch_op.add_column(sa.Column('total_sql_solved', sa.Integer(), server_default='0', nullable=True))

    # 4. Create research_sources table
    op.create_table(
        'research_sources',
        sa.Column('id', sa.String(length=64), nullable=False),
        sa.Column('title', sa.String(length=256), nullable=False),
        sa.Column('url', sa.String(length=512), nullable=False),
        sa.Column('source_type', sa.String(length=64), nullable=True),
        sa.Column('date_accessed', sa.String(length=32), nullable=True),
        sa.Column('reliability', sa.String(length=32), nullable=True),
        sa.Column('findings', sa.Text(), nullable=True),
        sa.Column('evidence_category', sa.String(length=64), nullable=True),
        sa.Column('confidence_label', sa.String(length=32), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    # 5. Create candidate_experiences table
    op.create_table(
        'candidate_experiences',
        sa.Column('id', sa.String(length=64), nullable=False),
        sa.Column('source_platform', sa.String(length=64), nullable=True),
        sa.Column('source_url', sa.String(length=512), nullable=True),
        sa.Column('date_reported', sa.String(length=32), nullable=True),
        sa.Column('role', sa.String(length=128), nullable=True),
        sa.Column('summary', sa.Text(), nullable=True),
        sa.Column('topics_mentioned', sa.JSON(), nullable=True),
        sa.Column('difficulty_rating', sa.String(length=32), nullable=True),
        sa.Column('verdict_notes', sa.Text(), nullable=True),
        sa.Column('evidence_category', sa.String(length=64), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade() -> None:
    op.drop_table('candidate_experiences')
    op.drop_table('research_sources')
    with op.batch_alter_table('learners') as batch_op:
        batch_op.drop_column('total_sql_solved')
    with op.batch_alter_table('coding_problems') as batch_op:
        batch_op.drop_column('confidence_label')
        batch_op.drop_column('evidence_category')
        batch_op.drop_column('hints')
        batch_op.drop_column('sample_data')
        batch_op.drop_column('test_cases')
        batch_op.drop_column('starter_code_sql')
        batch_op.drop_column('starter_code_javascript')
    with op.batch_alter_table('questions') as batch_op:
        batch_op.drop_column('question_type')
        batch_op.drop_column('source_title')
        batch_op.drop_column('source_url')
        batch_op.drop_column('confidence_label')
        batch_op.drop_column('evidence_category')
